import React, {Component} from 'react';


import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';
import { Button, PermissionsAndroid } from 'react-native';

class BoutonScanBluetooth extends Component{
    constructor(props){
        super(props);

        this.scanBluetooth = this.scanBluetooth.bind(this);
    }

    async requestAccessFineLocationPermission() {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Access fine location required for discovery',
            message:
              'In order to perform discovery, you must enable/allow ' +
              'fine location access.',
            buttonNeutral: 'Ask Me Later"',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        );
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

            //alert(`Autorisation : ${granted}`);

            let devices = await RNBluetoothClassic.startDiscovery();

            //alert(`J'ai trouvé ${devices.length} appareils non apparaillés`);

            //devices.forEach((item, index)=>{alert(item)});
            console.log(Object.keys(devices[0]));

            let allNames = await devices.map(x => x.name);
            let allNamesText = await allNames.join("\n");

            alert(allNamesText);
            /*
            await console.log(devices);
            await console.log(devices.length);
            await devices.map(x => console.log(x.name));
            */

            let hc05Device = await devices.find(this.isHC05);

            await console.log(hc05Device);
            /*
            await console.log(hc05Device.name);
            */
            

            await this.props.changeUpperState(hc05Device);

        } catch (err) {
          console.log(err);
            alert(err);
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