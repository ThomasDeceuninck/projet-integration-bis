import boto3
import os
import clefs
import json

aws_access_key_id = 'AKIA2LHQVF4P2MD7O4S6'
aws_secret_access_key = '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'
region_name = 'eu-west-3'
queue_url_get = 'https://sqs.eu-west-3.amazonaws.com/711321792287/integration_App_To_Rpi'    

sqs_client = boto3.client('sqs', region_name=region_name, aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)


def main():
    get_data()



def get_data():

    response = sqs_client.receive_message(
            QueueUrl=queue_url_get,
            MaxNumberOfMessages=1,
            MessageAttributeNames=['All'],
            AttributeNames=['SentTimestamp']
        )
    
    messages = response.get('Messages', [])
    print(messages)
        
    if messages:
        message = messages[0]
        body = json.loads(message['Body'])
        new_message = body['Message']

        
        data_reçue = new_message
        print('Message reçu:', data_reçue)
        receipt_handle=message["ReceiptHandle"]
        try :
            sqs_client.delete_message(QueueUrl= queue_url_get, ReceiptHandle= receipt_handle)
        except Exception as exc:
            print('Erreur de delete:' + str(exc))
            
                
                
                


def send_message_to_sqs(value_name, value):
    # Configuration des informations d'authentification AWS
    aws_access_key_id = 'AKIA2LHQVF4P2MD7O4S6'
    aws_secret_access_key = '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'
    region_name = 'eu-west-3'
    queue_url_get = 'https://sqs.eu-west-3.amazonaws.com/711321792287/intregation_Rpi_To_App'    ################################" A MODIFIER "

    
    # Créer un client SQS
    sqs = boto3.client('sqs', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key, region_name=region_name)

    # Message à envoyer
    message = f"{value_name}:{value}"

    try:
        # Envoyer le message à la file SQS
        response = sqs.send_message(
            QueueUrl=queue_url_get,
            MessageBody=message
        )
        
        print(f"Message envoyé avec succès : {response['MessageId']}")
        print(f"La valeur {value_name} : {value} a été envoyée à la file SQS")
    except Exception as e:
        print("Erreur lors de l'envoi du message à la file SQS :", e)


                

                
if __name__ == "__main__":
   main()