import * as React from "react"
import { View,Text, StyleSheet, range, Button , TouchableOpacity} from "react-native"
import Slider from '@react-native-community/slider'

import * as iot from '../../sendToIoT'



export default class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state={
      range:0
    }
  }

  


  setRange(data){           //Modifier la valeur de range(la valeur du slider)

    return this.setState({range:data})
  }

  send(data){
    console.log(data)
    iot.publishMessage("SeuilMic", data)
  }

  

  
  
    render(){
      return (
          <View style={styles.container}>
              <Text style= {{ fontSize:20, fontWeight:'bold'}}> Sensibilité du micro</Text>
              <Text style= {{ fontSize:20, fontWeight:'bold'}}> {this.state.range}</Text>
              <Slider 
              style= {{ width:250, height:40}}
              minimumValue={0}
              maximumValue={100}
              value={this.state.range} // MODIFIER POUR METTRE A LA VALEUR STOCKEE EN DB
              onValueChange= {value => this.setRange(Math.floor(value))}
              onSlidingComplete={ ()=>{this.send(this.state.range)}}
              />
              
     


                    </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      borderColor: 'green', 
      borderWidth: 1,       
      borderRadius: 5,      
      paddingHorizontal: 15,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      margintop:50,
    },
    buttonText: {
      color: 'green', 
    },
  
  });

