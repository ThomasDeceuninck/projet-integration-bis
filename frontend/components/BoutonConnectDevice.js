import React, {Component} from 'react';


import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';
import { Button, PermissionsAndroid } from 'react-native';

class BoutonConnectDevice extends Component{
    constructor(props){
        super(props);
        // state
        this.state={
            connection : false, // Si le device est connecté -> sera utilisé ? Vérifier les cas problématiques où il y aura des déconnexions ...
            connectionOptions : { // paramètres de connexion bluetooth
                CONNECTOR_TYPE: "rfcomm", // protocole bluetooth
                DELIMITER: "\n", // délimitation entre les messages -> vérifier
                DEVICE_CHARSET: Platform.OS === "ios" ? 1536 : "utf-8", // Type d'écriture, fonction condensée : 1536 si IOS, utf-8 sinon (Android). (C'est utf-8, c'est juste que IOS à une autre manière de l'écrire)
              },
        }
        // bind des fonctions
        this.afficheDevice = this.afficheDevice.bind(this);
        this.connect = this.connect.bind(this);
    }

    async afficheDevice(){
        try{
            alert(this.state.device);
        } catch (err) {
            console.log(err);
              alert(err);
          }
    }

    async connect(){
        try{
            if(this.state.device === "coucou"){
                throw new Error(`HC-05 Non trouvé. On ne peut pas vérifier qu'il est connecté`);
            }

            let connection = await this.props.device.isConnected();  // erreur quand on a pas défini le device
            console.log(`est connecté ? : ${connection}`);
            console.log(connection);


            if(!connection){
                try{
                    console.log("Essaie de connexion");
                    connection = await this.props.device.connect(this.state.connectionOptions);
                    console.log("Connecté")
                }
                catch{
                    console.log("Une erreur c'est produite lors de la connexion");
                    alert("Une erreur c'est produite lors de la connexion");
                }
                
            }

            this.initializeRead();
        }
        catch(error){
            alert(error);
            console.log(error);
        }

    }


    async disconnect(disconnected) {
        // remplir
    }


    async performRead() {
        // Faire en sorte quu'il vérifie si il y a des données disponibles à lire, lire tant qu'il y a des données
        // Problème : il y aura toujours des données -> comment bloquer de temps en temps pour permettre les autres parties du code de tourner 

        try {
          // remplir
          let available = await this.props.device.available();

          if(available > 0){
            for (let i = 0; i < available; i++) {
                let data = await this.props.device.read();
                console.log(data);
              }
          }
          
        } catch (err) {
          console.log(err);
        }
    }



    initializeRead() {
        // mets en place un eventlistener qui détecte quand des "socket" connections bluetooth se ferment, tombent, ont une erreur, ...
        // Quand il détecte ça => on déconnecte le device
        this.disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() => this.disconnect(true)); 
    
        // Mets en place un timer, toutes les secondes (1000 msec) on éffectues performRead()
        this.readInterval = setInterval(() => this.performRead(), 1000);

    }


    render(){
        return(
            <Button 
                onPress={this.connect}
                title={this.props.device.name}
                color="#f00"
                />
        )
    }
}



// Quand je définit device dans state comme étant this.props.state et que j'utilise .isConnected() -> erreur, j'ai gardé this.props.device>pas sûr que ce soit ça

export default BoutonConnectDevice