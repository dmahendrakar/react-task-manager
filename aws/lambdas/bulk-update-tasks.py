import boto3  
import json
import sys
import traceback
import decimal

logger = logging.getLogger()
logger.setLevel(logging.INFO)

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

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)

def lambda_handler(event, context):
    sqs = boto3.resource('sqs')
    queue = sqs.get_queue_by_name(QueueName='bulk-update-tasks')
    
    try:
        for task in json.loads(event['body']):
            logger.info('Adding task to update sqs, ' + json.dumps(task))
            response = queue.send_message(MessageBody=json.dumps(task))
            
            logger.info("UpdateItem sqs enqueue succeeded:");
            logger.info(json.dumps(response, indent=4, cls=DecimalEncoder));
    except:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        lines = traceback.format_exception(exc_type, exc_value, exc_traceback)
        logger.info(''.join('!! ' + line for line in lines))  # Log it or whatever here
        
        return generate_response(500, 'Error occurred while processing bulk update tasks')
        
    return generate_response(200, 'ok')