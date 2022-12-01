
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
  /*
  Serial.print(0);
  Serial.print(" ");
  Serial.print(1000);
  Serial.print(" ");
  */

  // Mis en commentaire suite au test 
  
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


  

/* communication serial : (à vérfieir, pas très prcis comme explication)
- print() : transmet la données sous forme d'une chaine de caractères. Chaque caractère est écrit avec un bit. 
            // On peut aussi préciser le type (binaire, decimal, hexadécimal, ...)
- println() : idem mais avec un "/n" en plus
- write() : transmet les données sous forme de bits 
            Ex : si on envoie une variable avec un int dedans il le transformera en caractère selon le code ASCII 128 caractères
  ATTENTION à l'aire de changer en fonction du Baud rate
*/


  
}
