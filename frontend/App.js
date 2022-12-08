import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import React, {Component} from 'react';
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';

import BlocBoutons from './components/blocBoutons';
//import { experimentalStyled } from '@mui/material';


class BluetoothOn extends Component {

  constructor(props){
    super(props)
    this.state = {
      connectedDevice : null, // Device connecté
      selectedDevice : null, // device bluetooth sélectionné pour la connection. Sera retiré plus tard quand on aura une liste (adaptative)
      actionRequired : null,
      //  indiquant qu'une action est demandé du coté téléphone. Cette variable est utilisée pour stopper la boucle d'écoute.
      // on mettra un string ou autre indiquant quelle action est demandée
      soundData:[], // Array où on stocke le valeurs envoyées par le bracelet.

    }

    this.changeUpperStateSelectedDevice = this.changeUpperStateSelectedDevice.bind(this);
    this.changeUpperStateConnectedDevice = this.changeUpperStateConnectedDevice.bind(this);
    this.initializeRead = this.initializeRead.bind(this);
    this.afficheSoundData = this.afficheSoundData.bind(this);
    //this.writeToDevice = this.writeToDevice.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  async changeUpperStateSelectedDevice(value){
    this.setState({"selectedDevice" : value});
  }

  async changeUpperStateConnectedDevice(value){
    this.setState({"connectedDevice" : value});
  }



  initializeRead() {
    /** 
     * Mets en place un eventlistener qui détecte quand des "socket" connections bluetooth se ferment, tombent, ont une erreur, ...
     * Quand il détecte ça => on déconnecte le device
     * 
     * Lance également la boucle de lecture avec this.performRead().
     */
    this.disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() => this.tryDisconnect()); 
    this.performRead();
  }




  async tryDisconnect(){
    /**
     * Gère la déconnexion bluetooth du coté du gsm. Si le device bluetooth est encore connecté il s'en déconnecte avec 
     * this.disconnect(). Si ce n'est pas le cas on ne peut qu'indiquer que le device est déconnecté.
     */
    try{
      let isConnected = await this.state.connectedDevice.isConnected();
      if(isConnected){
          this.disconnect();
      }
      else{
          // Si on arrive pas à se déconnecter avec .disconnect() de la librairie (car le bracelet est éteint, le bluetooth a été désactivé, etc.)
          clearInterval(this.readInterval);
          this.setState({connectedDevice : null});
          console.log("[Phone] Disconnected ungracefully");
      }
    } catch{
      console.log(error);
    }
  }




  async disconnect() {   
    /**
     * Déconnecte un device bluetooth encore connecté.
     */
    try {
      await this.state.disconnect();
      console.log("[Phone] Disconnected gracefully");
      this.setState({connectedDevice : null});
    } catch(error) {
      console.log("[Phone] Impossible to disconnect")
      console.log(error);
    }
  } 




  async performRead() {
    /**
     * Lance une boucle de lecture. On vérifie dans cette boucle si il y a des valeurs à lire et leur nombre. On lance ensuite une
     * autre boucle à l'interieur de la première qui lit à chaque fois une nouvelle donnée et la stocke dans this.state.soundData.
     * On sort de cette deuxième boucle dans deux cas : 
     *  - Plus de données à lire
     *  - On atteint 100 données lues
     * 
     * Quantd on sort de la deuxième boucle on vérifie si une acion est demandée du coté du gsm.
     */
    try {
      while(true){
        let available = await this.state.connectedDevice.available();
      
        if(available > 0){
          for (let i = 0; i < available; i++) {
              let data = await this.state.connectedDevice.read();
              //console.log("[data]"+ data);
              
              this.state.soundData.push(data);
              if(i == 128){
                break;
              }
          }

          //console.log("écriture vers bracelet");
          //this.writeToDevice("coucou\n");

          if(this.state.soundData.length >= 512){
            // appel de la fonction thomas avec this.state.soundData[:512]
          }

          
          if(this.state.actionRequired !== null){
            console.log("action demandée");
            // FONCTION DE GESTION D'ACTION
          }
        }
      }   
    } catch (err) {
      console.log(err);
    }
  }


  async writeToDevice(text){
    try{
      try{
        text = String(text);
      } catch(err){
        console.log(err);
        throw new Error(`La valeur à envoyer ne peut pas être transformée en string.`);
      }


      
      await RNBluetoothClassic.writeToDevice(
        this.state.connectedDevice.address,
        text,
        "utf-8"
      );
      
      
      //let text = Buffer.alloc(10, "a");  
      
      //await this.state.connectedDevice.write(text);



    } catch(err){
      console.log(err);

    }

  }

  afficheSoundData(){
    alert(this.state.soundData.length);
    console.log(this.state.soundData(length(this.state.soundData)));
  }

  sendData(){
    //this.writeToDevice("coucou\n");
    this.writeToDevice("coucou\n");
  }



  render() {
    return (
      <View>
        <BlocBoutons 
          changeUpperStateSelectedDevice={this.changeUpperStateSelectedDevice} 
          changeUpperStateConnectedDevice={this.changeUpperStateConnectedDevice} 
          initializeRead={this.initializeRead}
          afficheSoundData={this.afficheSoundData}
          selectedDevice={this.state.selectedDevice} 
          connectedDevice={this.state.connectedDevice}
        />
        <Button 
          onPress={this.sendData}
          title="send data"
          color="#f00"
        />
      </View>
      
    );
  }
}




export default BluetoothOn;