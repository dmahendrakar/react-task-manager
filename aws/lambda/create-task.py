import json
import logging
import uuid
import boto3
import decimal
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
    
def lambda_handler(event, context):
    table = boto3.resource('dynamodb').Table('dev-tasks')
    client = boto3.client('stepfunctions')
    
    task = json.loads(event['body'])    
    task['id'] = uuid.uuid4().hex
    
    response = table.put_item(Item=task)
    logger.info("PutItem succeeded:");
    logger.info(json.dumps(response, indent=4, cls=DecimalEncoder, default=datetimeConverter));
    
    if('reminderTime' in task):
        task['reminderISOTime'] = datetime.utcfromtimestamp(task['reminderTime']/1000).strftime('%Y-%m-%dT%H:%M:%SZ')
        response = client.start_execution(
            stateMachineArn='arn:aws:states:us-west-2:554376166526:stateMachine:task-email-reminder',
            name=task['id']+'-'+str(task['reminderTime']),
            input=json.dumps(task)
        )
        logger.info("Set email reminder succeeded:");
        logger.info(json.dumps(response, indent=4, cls=DecimalEncoder, default=datetimeConverter));
    
    return generate_response(200, json.dumps({'id': task['id']}, indent=4, cls=DecimalEncoder))
