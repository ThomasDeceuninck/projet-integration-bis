

#include <SoftwareSerial.h>

#define rxPin 11 // Broche 11 en tant que RX, à raccorder sur TX du HC-05
#define txPin 10 // Broche 10 en tant que TX, à raccorder sur RX du HC-05 
SoftwareSerial hc05(rxPin, txPin);

#define ledTest 5
#define ledReceive 4



void setup()
{
Serial.begin(9600); // intitialise la connexion série à travers l'alimentation


hc05.begin(9600); // intitialise la connexion série à travers le hc05
hc05.setTimeout(100); // set new value to 100 milliseconds

pinMode(A3,INPUT);
pinMode(ledTest,OUTPUT);
pinMode(ledReceive,OUTPUT);

digitalWrite(ledTest, LOW);
digitalWrite(ledReceive, LOW);




}


void loop() {

  
  int readValue = analogRead(A3);

  //Serial.println(readValue);
  
  hc05.println(readValue);  


  if(readValue>310){
    Serial.println("Au dessus\n");
    digitalWrite(ledTest, HIGH);
    //hc05.println(readValue);   
  }
  else{
    digitalWrite(ledTest, LOW);

  }

/* En dehors du if ça marche
   String incomingString = hc05.readStringUntil('\n');


    // prints the received data
    Serial.print("I received: ");
    Serial.println(incomingString);
    delay(100);
  
 */

/*
// dans le if on a des problèmes de lecture. On obtiens pas la donnée correcte
  if (hc05.available() > 0) {
    //String incomingString = Serial.readStringUntil('\n');
    String incomingString = hc05.readStringUntil('\n');


    // prints the received data
    Serial.print("I received: ");
    Serial.println(incomingString);
    delay(100);
  } 

*/


  if(hc05.available()){
    digitalWrite(ledReceive, HIGH);

    

    String receivedData = hc05.readStringUntil("\n");
    //String receivedData = Serial.readStringUntil("\n");


    receivedData.trim(); // Enlève \r, \n ou des espaces à la fin du string si il y en a. Normalement pas besoin car readStringUntil ne stocke pas le délimiteur


    Serial.println(receivedData);


    if(receivedData == "coucou"){
      digitalWrite(ledReceive, HIGH);
    }
    
    digitalWrite(ledReceive, LOW);
  }


  




  
}
