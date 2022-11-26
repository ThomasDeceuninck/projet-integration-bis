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
            if(this.props.selectedDevice === null){
                throw new Error(`HC-05 Non trouvé. On ne peut pas vérifier qu'il est connecté`);
            }

            let connection = await this.props.selectedDevice.isConnected();  // erreur quand on a pas défini le device
            console.log(`est connecté ? : ${connection}`);
            console.log(connection);
            


            if(!connection){
                try{
                    console.log("Essaie de connexion");
                    connection = await this.props.selectedDevice.connect(this.state.connectionOptions);
                    console.log("Connecté")
                    this.props.changeUpperStateConnectedDevice(this.props.selectedDevice); // mets dans le state que le device est connecté 
                    try{
                        this.props.initializeRead();
                    } catch{
                        console.log("Une erreur s'est produit lors de la lecture");
                    }
                    
                }
                catch{
                    console.log("Une erreur c'est produite lors de la connexion");
                    alert("Une erreur c'est produite lors de la connexion");
                }
                
            }

            
        }
        catch(error){
            alert(error);
            console.log(error);
        }

    }



    // devra disparaitre plus tard
    testIfThereIsADeviceSelected(){
        if(this.props.selectedDevice === null){
            return("no device selected");
        }
        else{
            return(this.props.selectedDevice.name);
            
        }
    }


    render(){
        return(
            <Button 
                onPress={this.connect}
                title={this.testIfThereIsADeviceSelected()}
                color="#f00"
                />
        )
    }
}



// Quand je définit device dans state comme étant this.props.state et que j'utilise .isConnected() -> erreur, j'ai gardé this.props.device>pas sûr que ce soit ça

export default BoutonConnectDevice