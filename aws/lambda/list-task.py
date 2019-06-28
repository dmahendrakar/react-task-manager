import json
import logging
import uuid
import boto3
import decimal

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
    
def lambda_handler(event, context):
    table = boto3.resource('dynamodb').Table('dev-tasks')
    response = table.scan()
    
    return generate_response(200, json.dumps(response['Items'], indent=4, cls=DecimalEncoder))
