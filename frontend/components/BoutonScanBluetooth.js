import React, {Component} from 'react';


import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';
import { Button, PermissionsAndroid } from 'react-native';

class BoutonScanBluetooth extends Component{
    constructor(props){
        super(props);

        this.state={
          locationPermissionAcquired : false, // Permission besoin (sur Android) pour faire un scan des devices bluetooth
          scanningForBluetooth : false, // Indique si le téléphone est en train de scanner les devices bluetooth autour de lui

        }

        this.scanBluetooth = this.scanBluetooth.bind(this);
    }

    async requestAccessFineLocationPermission() {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Autorisez la localisation précise',
            message:
              'Pour pouvoir détecter les appareils bluetooth autour de vous vous devez autoriser la géolocalisation précise.',
            buttonNeutral: 'Me demander plus tard',
            buttonNegative: 'Non',
            buttonPositive: "D'accord"
          }
        );
        this.setState({locationPermissionAcquired : granted}); // on change l'état de la permission
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    };

    isHC05(device){
        if (device.name == "HC-05"){
            return true;
        }
    }

    async scanBluetooth(){
        try {

            let granted = await this.requestAccessFineLocationPermission();

            // indique une erreur si on a pas la permission nécessaire
            if (!granted) {
              throw new Error(`Vous n'avez pas Autorisé la permission de localisation.`);
              }
            
            this.setState({scanningForBluetooth : true});
            console.log("[Phone] scanning for bluetooth"); 
            let devices = await RNBluetoothClassic.startDiscovery();
            this.setState({scanningForBluetooth : false});
            console.log("[Phone] stopped scanning for bluetooth");


            
            console.log(Object.keys(devices[0])); //pour afficher toutes les clés qu'il y a dans un objet "Device"

            // Pour afficher sur l'app tous les appareils bluetooth à proximité (temporaire)
            let allNames = await devices.map(x => x.name);
            let allNamesText = await allNames.join("\n");
            alert(allNamesText);
            console.log(allNamesText);

            /*
            await console.log(devices);
            await console.log(devices.length);
            await devices.map(x => console.log(x.name));
            */

            let hc05Device = await devices.find(this.isHC05);
            console.log(hc05Device);

            if(hc05Device){
              await this.props.changeUpperStateSelectedDevice(hc05Device);
            }
            else{ // si = Undefined ( si il ne l'a pas trouvé)
              console.log("HC-05 n'est pas disponible à proximité");
              alert("HC-05 n'est pas disponible à proximité");
            }
        } 
        catch (err) {
          console.log(err);
          alert(err); // interessant d'afficher toutes les erreurs sur l'appli ?
        }
    }

    render(){
        return(
            <Button 
            onPress={this.scanBluetooth}
            title="Scan Bluetooth"
            color="#f00"
            />
        )
    }
}


export default BoutonScanBluetooth;