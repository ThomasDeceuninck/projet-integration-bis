import { useNavigation } from "@react-navigation/native";
import * as React from "react"
import { View,Text, Button , ScrollView, StyleSheet, TouchableOpacity} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import SoundSettings from "./SoundSettings";


export default class Sounds extends React.Component{
  constructor(props){
    super(props)
    this.state={
      sounds: []
      
    }
  }
  componentDidMount() {
    this.loadSounds(); // Charger les sons lors du montage du composant
  }

  loadSounds = async () => {
    try {
      const savedSounds = await AsyncStorage.getItem('soundsData');
      if (savedSounds !== null) {
        const soundsArray = JSON.parse(savedSounds);
        this.setState({ sounds: soundsArray });
        console.log(soundsArray);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des sons :", error);
    }
  };
 

    addSound() {
      this.props.navigation.navigate('SoundSettings')    }

    selectItem(data){
      /*for ( let x of this.state.sounds){
        if ( data == x.key){
          x.isChecked= !x.isChecked
          this.state
        }
      }*/

      const {sounds}= this.state
      let arr= sounds.map((item) =>{
        if ( data == item.key){
          item.isChecked= !item.isChecked
        
        }
        return {...item}
        })
        this.setState({sounds: arr})
    }

    

render(){
    return (
      <View style={styles.container}>
      <ScrollView>
        {this.state.sounds.map((item) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => this.selectItem(item.key)}
              onLongPress={() => this.props.navigation.navigate('SoundSettings', { selectedKey: item.key })}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 20 }}>{item.title}</Text>
              <Text style={{ fontSize: 10, paddingRight: 10 }}>{item.isChecked ? 'Sélectionné' : ""}</Text>
            </TouchableOpacity>
          );
        })}

            <TouchableOpacity 
            onPress={this.addSound}>
            <Ionicons 
            size={40} 
            name= "add-outline"
            style={styles.icon}/>
            </TouchableOpacity>
        </ScrollView>
        
    </View>
      );
    }  
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent:'center',
      alignItems:'flex-start'
    },
    item: {
      height: 55,
      width:'100%',
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems: 'center',
      borderBottomWidth: 1,      
      
      
    },
    icon:{
      alignSelf:'center',
    margin: 10,
    borderRadius:50,
  },

    title: {
      fontSize: 32,
    },

  });
  