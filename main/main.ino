// Dans ce fichier on transvase puis on connecte le module bluetooth aux TX et RX du l'arduino. Serial sera ces pins (0 et 1)
// On envoie par le odule et pour vérifier que ça marche bien on réenvoie un println par là


 // Broche 11 en tant que RX, à raccorder sur TX du HC-05
 // Broche 10 en tant que TX, à raccorder sur RX du HC-05 


#define ledTest 5
#define ledReceive 4



void setup()
{
Serial.begin(9600); // intitialise la connexion série à travers l'alimentation

Serial.setTimeout(10); // défini le temps de fonctionnement des fonctions sur Serial, de base : 1000 ms = 1 sec (la lecture durait une seconde sans ça)



pinMode(A3,INPUT);
pinMode(ledTest,OUTPUT);
pinMode(ledReceive,OUTPUT);

digitalWrite(ledTest, LOW);
digitalWrite(ledReceive, LOW);




}


void loop() {

  
  int readValue = analogRead(A3);

  Serial.println(readValue);  //remettre
  


  if(readValue>310){
    //Serial.print("Au dessus\n"); 
    digitalWrite(ledTest, HIGH);  
  }
  else{
    digitalWrite(ledTest, LOW);

  }


  if(Serial.available() > 0){
    
    String receivedData = Serial.readStringUntil("\n");
    receivedData.trim();

    if(receivedData == "coucou"){
      digitalWrite(ledReceive, HIGH);
    }
    
    //Serial.println(receivedData);
    digitalWrite(ledReceive, LOW);
  }
  
}
