import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, {Component} from 'react';
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';

import BlocBoutons from './components/blocBoutons';
//import { experimentalStyled } from '@mui/material';




/* // Code de base de App.js
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/


class BluetoothOn extends Component {

  constructor(props){
    super(props)
    this.state = {
      connectedDevice : null, // Device connecté
      selectedDevice : null, // device bluetooth sélectionné pour la connection. Sera retiré plus tard quand on aura une liste (adaptative)
      actionRequired : null,
      //  indiquant qu'une action est demandé du coté téléphone. Cette variable est utilisée pour stopper la boucle d'écoute.
      // on mettra un string ou autre indiquant quelle action est demandée
      

    }

    this.changeUpperStateSelectedDevice = this.changeUpperStateSelectedDevice.bind(this);
    this.changeUpperStateConnectedDevice = this.changeUpperStateConnectedDevice.bind(this);
    this.initializeRead = this.initializeRead.bind(this);
  }

  async changeUpperStateSelectedDevice(value){
    this.setState({"selectedDevice" : value});
  }

  async changeUpperStateConnectedDevice(value){
    this.setState({"connectedDevice" : value});
  }



  initializeRead() {
    // mets en place un eventlistener qui détecte quand des "socket" connections bluetooth se ferment, tombent, ont une erreur, ...
    // Quand il détecte ça => on déconnecte le device
    this.disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() => this.tryDisconnect()); 

    // Mets en place un timer, toutes les secondes (1000 msec) on éffectues performRead()
    //                 this.readInterval = setInterval(() => this.performRead1(), 1000);

    // Boucle de lecture et vérifie de temps en teps lorsqu'il y a une action demandée du coté gsm
    this.performRead2();

    // au lieu d'appeler un simple read tous les x temps on apelle une boucle infinie. Dans cette boucle infinie on vérifie le changement d'une certaine valeur 
    // qui indique qu'une interruption est nécessaire (demande d'action du coté du gsm)
    //this.performRead2()
  }




  async tryDisconnect(){
    try{
      let isConnected = await this.state.connectedDevice.isConnected();
      if(isConnected){
          // considéré comme encore connecté : 
          this.disconnect();
      }
      else{
          // Si on arrive pas à se déconnecter avec .disconnect() de la librairie (car le bracelet est éteint, le bluetooth a été désactivé, etc.)
          clearInterval(this.readInterval);
          this.setState({connected : false});
          console.log("[Phone]Disconnected ungracefully");
      }
    } catch{
      console.log(error);
    }
  }




  async disconnect() {   
    try {
      clearInterval(this.readInterval); // désactive la lecture toutes les secondes
      let disconnected = await this.state.disconnect();
      console.log("[Phone]Disconnected gracefully");
      this.setState({connected : !disconnected});
    } catch(error) {
      console.log(error);
    }
  } 



  async performRead1() {
    // Faire en sorte quu'il vérifie si il y a des données disponibles à lire, lire tant qu'il y a des données
    // Problème : il y aura toujours des données -> comment bloquer de temps en temps pour permettre les autres parties du code de tourner 

    try {
      let available = await this.state.connectedDevice.available();

      if(available > 0){
        for (let i = 0; i < available; i++) {
            let data = await this.state.connectedDevice.read();
            console.log("data "+ data);
            // ECRIRE EN DB
          }
        console.log("Sorti ............................................................................");
      }
      
    } catch (err) {
      console.log(err);
    }
  }



  async performRead2() {
    // Boucle de lecture infinie et vérification d'une valeur state qui indique si on a besoin d'interrompre la lecture pour lancer une action coté gsm
    // Arrive à lire quand il n'y a pas de donnée available ? 
    // Vérification du state toutes les X boucles ? avec un setInterval ?
    // esayyer un setInterval sans delay

    try {
      while(true){
        let available = await this.state.connectedDevice.available();
      
        if(available > 0){
          for (let i = 0; i < available; i++) {
              let data = await this.state.connectedDevice.read();
              console.log("data "+ data);
              // ECRIRE EN DB
  
              if(i>100){
                console.log("100");
                if(this.state.actionRequired !== null){
                  console.log("action demandée");
                }
                break;
              }
          }
          console.log("Sorti ............................................................................");
        }
      }   
    } catch (err) {
      console.log(err);
    }
  }




  render() {
    return (
      <BlocBoutons 
      changeUpperStateSelectedDevice={this.changeUpperStateSelectedDevice} 
      changeUpperStateConnectedDevice={this.changeUpperStateConnectedDevice} 
      initializeRead={this.initializeRead}
      selectedDevice={this.state.selectedDevice} 
      connectedDevice={this.state.connectedDevice}/>
    );
  }
}




export default BluetoothOn;