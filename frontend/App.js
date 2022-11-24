import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, {Component} from 'react';

import BlocBoutons from './components/blocBoutons';




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
      actionRequired : false // Bolléen indiquant qu'une action est demandé du coté téléphone. Cette variable est utilisée pour stopper la boucle d'écoute.

    }

    this.changeUpperStateSelectedDevice = this.changeUpperStateSelectedDevice.bind(this);
    this.changeUpperStateConnectedDevice = this.changeUpperStateConnectedDevice.bind(this);
  }

  async changeUpperStateSelectedDevice(value){
    this.setState({"selectedDevice" : value});
  }

  async changeUpperStateConnectedDevice(value){
    this.setState({"connectedDevice" : value});
  }


  render() {
    return (
      <BlocBoutons 
      changeUpperStateSelectedDevice={this.changeUpperStateSelectedDevice} 
      changeUpperStateConnectedDevice={this.changeUpperStateConnectedDevice} 
      selectedDevice={this.state.selectedDevice} 
      connectedDevice={this.state.connectedDevice}/>
    );
  }
}




export default BluetoothOn;