import { useNavigation } from "@react-navigation/native";
import * as React from "react"
import { View,Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Item } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Audio} from "expo-av"
 



import Sounds from "./Sounds";


export default class SoundSettings extends React.Component{

  constructor(props){
    super(props)
    this.state={
      vibrations: [
      { title: 'Vibration1', key:'1',isChecked: false},
      { title: 'Vibration2', key:'2',isChecked: false},
      { title: 'Vibration3', key:'3',isChecked: false},
      { title: 'Vibration4', key:'4',isChecked: false}
      ],
      isRecording: false
      
    }
  }

validerSon(){
  alert("Feature soon ")
  this.props.navigation.navigate('Sounds')
  
}

supprimerSon(){
  alert("Feature soon ")
  this.props.navigation.navigate('Sounds')

  
}

startRecording = async () => {
  try{
    const permission = await Audio.requestPermissionAsync()

    if (permission.status== "granted"){
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY)
      this.setState({isRecording:true})

    }
    else{
      alert("Veuillez donner l'autorisation au micro pour pouvoir enregistrer.")
    }
  
  }
  catch(err){
    console.error("Echec de l'enregistrement")
  }
  
  //this.setState({ isRecording: true });
}

stopRecording = async () => {
  this.setState({isRecording:false})
  await recording.stopAndunloadAsync()
}




selectItem(data){
  /*for ( let x of this.state.sounds){
    if ( data == x.key){
      x.isChecked= !x.isChecked
      this.state
    }
  }*/

  const {vibrations}= this.state
  let arr= vibrations.map((item) =>{
    if ( data == item.key){
      item.isChecked= !item.isChecked
      console.log(item.isChecked)
    }
    else {
      item.isChecked=false
    }
    return {...item}
    })
    this.setState({vibrations: arr})
}




  render(){
    const { navigation } = this.props
    return (
        <View style= {{ alignItems:'center'}}>
            <TextInput 
              style={styles.input} 
              placeholder= "r"
              
              />
              <Ionicons size={10} name="mic-outline"/>
              <Ionicons name="play-outline"/>
            
              {this.state.vibrations.map((item) =>{
                return ( 
                    <TouchableOpacity
                    style={styles.item}
                    onPress={ () => this.selectItem(item.key)}
                
                  >


                    

                    <Text style= {{ fontSize:16,fontWeight:'bold'}}> {item.title}</Text>
                    <Text style={{fontSize:10}}>{item.isChecked ? 'Sélectionné': ""}</Text>

                    </TouchableOpacity>
              
          )
        })}

          <Pressable
            style={{    
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 4,
                elevation: 3,
                backgroundColor: '#FA8072',
                margin:10,
                width:'40%'
            }}
            onPress={() => this.supprimerSon()}>
              <Text> Supprimer</Text>
          </Pressable>
          <Pressable
              style={{    alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 4,
              elevation: 3,
              backgroundColor: '#90EE90',
              margin:10,
              width:'40%'
              }}

              title='Valider'  
              onPress={() => this.validerSon()}>
              <Text> Valider</Text>
          </Pressable>


          <TouchableOpacity
        onPressIn={this.startRecording}
        onPressOut={this.stopRecording}
      >
        <Text>{this.state.isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
    </View>
      );
  }
}  

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 100,
    textAlign: 'center'
  },
  icons:{
    flex: 1,
    width: 50,
    height: 50,
    
  },
  item: {
    backgroundColor: '#CCD1D1',
    height: 20,
    width:'80%',
    borderRadius: 12,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal:10,
    
    
  },
 

});




