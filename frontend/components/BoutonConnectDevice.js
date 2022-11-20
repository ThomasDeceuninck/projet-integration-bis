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
            device : this.props.device, // objet "Device" utilisé par la librairie bluetooth
            connection : false, // Si le device est connecté
            connectionOptions : { // paramètres de connexion bluetooth
                CONNECTOR_TYPE: "rfcomm", // protocole bluetooth
                DELIMITER: "\n", // délimitation entre les messages -> vérifier
                DEVICE_CHARSET: Platform.OS === "ios" ? 1536 : "utf-8", // Type d'écriture, fonction condensée : 1536 si IOS, utf-8 sinon (Android). (C'est utf-8, c'est juste que IOS à une autre manière de l'écrire)
              },
        }
        // bind des fonctions
        this.afficheDevice = this.afficheDevice.bind(this);
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
            conection = this.state.device.isConnected();

            if(!connection){
                console.log("Essaie de connexion");
                connection = await this.props.device.connect(this.state.connectionOptions);
            }

        }
        catch(error){

        }

    }


    render(){
        return(
            <Button 
                onPress={this.afficheDevice}
                title="Connect to HC-06"
                color="#f00"
                />
        )
    }
}



export default BoutonConnectDevice