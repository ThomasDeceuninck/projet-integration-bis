
#include <SoftwareSerial.h>

#define rxPin 11 // Broche 11 en tant que RX, à raccorder sur TX du HC-05
#define txPin 10 // Broche 10 en tant que TX, à raccorder sur RX du HC-05 
SoftwareSerial hc05(rxPin, txPin);

#define ledTest 5




void setup()
{
Serial.begin(9600); // intitialise la connexion série à travers l'alimentation

//Serial.begin(38400); 
//Serial.begin(74880); 

hc05.begin(9600); // intitialise la connexion série à travers le hc05
//hc05.begin(38400);

pinMode(A3,INPUT);
pinMode(ledTest,OUTPUT);

digitalWrite(ledTest, LOW);


}


void loop() {
  /* Pour visualiser plus facilement sur le traceur série
  Serial.print(0);
  Serial.print(" ");
  Serial.print(1000);
  Serial.print(" ");
  */

  // Mis en commentaire suite au test 
  
  int readValue = analogRead(A3);

  Serial.println(readValue);
  hc05.println(readValue);
  //delay(5);

  if(readValue>310){
    Serial.println("Au dessus\n");
    digitalWrite(ledTest, HIGH);
    //hc05.println(readValue);   
  }
  else{
    digitalWrite(ledTest, LOW);

  }

  
// Marche pas. Rien ne se passe quand on envoie une valeur depuis le terminal bluetooth sur smartphone. Ne détecte pas de donnée disponible
  if(hc05.available()){
    int givenNumber = hc05.read();
    if(givenNumber > 100){
      hc05.write(givenNumber);
    }
    
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
