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
            device : this.props.device
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