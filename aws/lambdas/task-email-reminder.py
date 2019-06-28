import boto3
from botocore.exceptions import ClientError
import sys
import traceback
import json
import decimal
from boto3.dynamodb.conditions import Key, Attr

SENDER = "TaskManagerApp <dpkm95@gmail.com>"
RECIPIENT = "dpkm95@gmail.com"
CHARSET = "UTF-8"
AWS_REGION = "us-west-2"

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)
        
def get_task(taskId):
    task = None
    try:
        dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
        table = dynamodb.Table('dev-tasks')
        
        response = table.query(
            KeyConditionExpression=Key('id').eq(taskId)
        )
        task = response['Items'][0]  if len(response['Items']) else None
    except:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        lines = traceback.format_exception(exc_type, exc_value, exc_traceback)
        logger.info(''.join('!! ' + line for line in lines))  # Log it or whatever here 
    
    return task

def generate_response(status_code, response):
    return {'statusCode': status_code, 'body': response, 'isBase64Encoded': False}

def lambda_handler(event, context):
    logger.info('event', event)
    task = get_task(event['id'])
    logger.info('task', task)
    
    if task:
        # Create a new SES resource and specify a region.
        client = boto3.client('ses',region_name=AWS_REGION)
        
        # Try to send the email.
        try:
            #Provide the contents of the email.
            response = client.send_email(
                Destination={
                    'ToAddresses': [
                        task['reminderRecipientEmail'] if 'reminderRecipientEmail' in task else RECIPIENT,
                    ],
                },
                Message={
                    'Body': {
                        'Text': {
                            'Charset': CHARSET,
                            'Data': "Description:  \r\n" + task['description'] if 'description' in task else 'No description',
                        },
                    },
                    'Subject': {
                        'Charset': CHARSET,
                        'Data': 'Task reminder: ' + task['title'],
                    },
                },
                Source=SENDER
            )
        # Display an error if something goes wrong.	
        except ClientError as e:
            logger.info(e.response['Error']['Message'])
            
            return generate_response(500, 'Error occurred while processing email remainder')
        else:
            logger.info("Email sent! Message ID:"),
            logger.info(response['MessageId'])
            
        return generate_response(200, 'ok')