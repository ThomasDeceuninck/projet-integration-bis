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
            connection : false, // Si le device est connecté
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

            let connection = this.props.device.isConnected(); // Apparement : isConnected() not a function
            console.log(`est connecté ? : ${connection}`);
            console.log(connection);

            connection = false; // mis temporairement pour tester .connect()

            if(!connection){
                console.log("Essaie de connexion");
                connection = await this.props.device.connect(this.state.connectionOptions);
                console.log("fin de connexion")
            }

        }
        catch(error){
            alert(error);
            console.log(error);
        }

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