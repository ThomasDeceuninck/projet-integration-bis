import React, {Component} from 'react';
import { View, Button } from 'react-native';

import BoutonScanBluetooth from './BoutonScanBluetooth';
import BoutonConnectDevice from './BoutonConnectDevice';

class BlocBoutons extends Component{
    constructor(props){
        super(props);
        this.state={
            bluetoothEnabled : false,
            //device : {name : "coucou"},

        }

        this.checkBluetoothEnabled=this.checkBluetoothEnabled.bind(this);
        this.alertState=this.alertState.bind(this);
    }

    

    async checkBluetoothEnabled() {
        try {
          console.log('App::componentDidMount Checking bluetooth status');
          let enabled = await RNBluetoothClassic.isBluetoothEnabled();
    
          console.log(`App::componentDidMount Status: ${enabled}`);
          this.setState({ bluetoothEnabled: enabled });
        } 
        catch (error) {
          console.log('App::componentDidMount Status Error: ', error);
          this.setState({ bluetoothEnabled: false });
        }
      }

    alertState(){
        alert(this.state.device.name);
        console.log(this.state.device)
    }

    render(){
        return(
            <View>
                <BoutonScanBluetooth changeUpperStateSelectedDevice={this.props.changeUpperStateSelectedDevice}/>

                <BoutonConnectDevice selectedDevice={this.props.selectedDevice} changeUpperStateConnectedDevice={this.props.changeUpperStateConnectedDevice}/>

                <Button 
                onPress={this.alertState}
                title="Afficher state"
                color="#f00"
                />

            </View>
        )
    }

}

export default BlocBoutons