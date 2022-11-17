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
        
    }
  }


  render() {
    return (
      <BlocBoutons/>
    );
  }
}




export default BluetoothOn;