import React, {Component} from 'react';
import { View, Button } from 'react-native';

import BoutonScanBluetooth from './BoutonScanBluetooth';
import BoutonConnectDevice from './BoutonConnectDevice';

class BlocBoutons extends Component{
    constructor(props){
        super(props);
        this.state={
            device : "coucou",

        }
        this.changeUpperState=this.changeUpperState.bind(this);
        this.alertState=this.alertState.bind(this);
    }

    async changeUpperState(value){
        this.setState({"device" : value});
        //this.setState({[whatToChange] : value});

    }

    alertState(){
        alert(this.state.device.name);
        console.log(this.state.device)
    }

    render(){
        return(
            <View>
                <BoutonScanBluetooth changeUpperState={this.changeUpperState}/>

                <BoutonConnectDevice device={this.state.device}/>

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