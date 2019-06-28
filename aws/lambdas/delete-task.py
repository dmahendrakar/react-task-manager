import json
import logging
import uuid
import boto3
import decimal
import sys
import traceback

logger = logging.getLogger()
logger.setLevel(logging.INFO)

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)

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
    
def delete_task(event):
    table = boto3.resource('dynamodb').Table('dev-tasks')
    
    task = json.loads(event['body'])
    response = table.delete_item(Key=task)
    
    logger.info("DeleteItem succeeded:");
    logger.info(json.dumps(response, indent=4, cls=DecimalEncoder));
        
    return response

def lambda_handler(event, context):
    try:
        #handle SQS trigger
        if('Records' in event):
            for record in event['Records']:
                delete_task(record)
        else:
            delete_task(event)
        
        return generate_response(200, 'ok')
    except: 
        exc_type, exc_value, exc_traceback = sys.exc_info()
        lines = traceback.format_exception(exc_type, exc_value, exc_traceback)
        logger.info(''.join('!! ' + line for line in lines))
        
        return generate_response(500, 'Error occurred while processing delete tasks')