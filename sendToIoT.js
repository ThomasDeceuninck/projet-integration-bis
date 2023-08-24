import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import AWS from 'aws-sdk';


   export const publishMessage = async (valueName,value) => {
    // Configuration des informations d'authentification AWS
    AWS.config.update({
        region: 'eu-west-3',
        accessKeyId: 'AKIA2LHQVF4P3E56H5X5',
        secretAccessKey: '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',
      });

    // Créer un client SNS
    const sns = new AWS.SNS();

    // ARN du sujet SNS 
    const topicArnFaceToRpi = 'arn:aws:sns:eu-west-3:711321792287:inte_APP_TO_RPI'    ;

    // Message à publier
    const message = `${valueName}:${value}`;

    try {
      // Publier le message sur le sujet
      const params = {
        Message: message,
        TopicArn: topicArnFaceToRpi,
      };

      const data = await sns.publish(params).promise();
      console.log(`Message publié avec succès : ${data.MessageId}`);
      console.log("La valeur " +  valueName + ' : ' + value + " a été envoyée")
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };




