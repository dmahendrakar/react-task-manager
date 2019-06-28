import json
import logging
import uuid
import boto3
import decimal
import sys
import traceback
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)

def datetimeConverter(o):
    if isinstance(o, datetime):
        return o.__str__()

def generate_response(status_code, response):
    return {
        'statusCode': status_code, 
        'body': response, 
        'headers': {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : True
        },
        'isBase64Encoded': False
    }
    
def update_task(event):
    table = boto3.resource('dynamodb').Table('dev-tasks')
    client = boto3.client('stepfunctions')

    task = json.loads(event['body'])
    logger.info("Updating Item: ", task);
    
    response = table.put_item(Item=task)
    
    logger.info("PutItem succeeded:");
    logger.info(json.dumps(response, indent=4, cls=DecimalEncoder));
    
    try:
        if('reminderTime' in task):
            task['reminderISOTime'] = datetime.utcfromtimestamp(task['reminderTime']/1000).strftime('%Y-%m-%dT%H:%M:%SZ')
            response = client.start_execution(
                stateMachineArn='arn:aws:states:us-west-2:554376166526:stateMachine:task-email-reminder',
                name=task['id']+'-'+str(task['reminderTime']),
                input=json.dumps(task)
            )
            logger.info("Set email reminder succeeded:");
            logger.info(json.dumps(response, indent=4, cls=DecimalEncoder, default=datetimeConverter));
    except: # Ignore if remainder is already set, TODO improve handling
        logger.info("Remainder is already set");
        exc_type, exc_value, exc_traceback = sys.exc_info()
        lines = traceback.format_exception(exc_type, exc_value, exc_traceback)
        logger.info(''.join('!! ' + line for line in lines))  # Log it or whatever here
        
    return response

def lambda_handler(event, context):
    try:
        #handle SQS trigger
        if('Records' in event):
            for record in event['Records']:
                update_task(record)
        else:
            update_task(event)
        
        return generate_response(200, 'ok')
    except:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        lines = traceback.format_exception(exc_type, exc_value, exc_traceback)
        logger.info(''.join('!! ' + line for line in lines))  # Log it or whatever here
        
        return generate_response(500, 'Error occurred while processing update tasks')