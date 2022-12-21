import { useNavigation } from "@react-navigation/native";
import * as React from "react"
import { View,Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Item, PermissionsAndroid } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Permissions from "react-native-permissions"
import Sound from 'react-native-sound'
import AudioRecord from "react-native-audio-record"
import {Buffer} from 'buffer'
 



import Sounds from "./Sounds";


export default class SoundSettings extends React.Component{


    sound=null
    state={
      vibrations: [
      { title: 'Vibration1', key:'1',isChecked: false},
      { title: 'Vibration2', key:'2',isChecked: false},
      { title: 'Vibration3', key:'3',isChecked: false},
      { title: 'Vibration4', key:'4',isChecked: false}
      ],
      recording:false,
      audioFile: "",
      loaded:false,
      paused:true,
    }

    async componentDidMount(){
      this.checkPermSound()
      const options= {
        sampleRate: 16000,
        channels:1,
        bitPerSample:16,
        wavFile: "test.wav"
      }
    
      AudioRecord.init(options)
    
      AudioRecord.on("data", data=>{
        const chunk= Buffer.from(data, "base64")
        
      })
    }
  
    checkPermSound= async ()=>{
      const GrantedPerm = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title:"Veuillez autoriser l'accès au micro",
        buttonPositive:'Ok',
        buttonNegative:"Refuser"
      }
    )
  
    const perm = await Permissions.check('microphone')
  
    if (p == "authorized"){
      return this.requestPermSound
    }
  }
  
  requestPermSound= async ()=>{
    const perm = await Permissions.request('microphone')
  
  }
  
  startRecording= ()=>{
    this.setState({audioFile: "", recording:true, loaded:false})
    AudioRecord.start()
  }
  
  stopRecording= async ()=>{
  
    if (this.state.recording==false){
      return
    }
    let audioFile=  await AudioRecord.stop()
    this.setState({audioFile, recording:false})
  }
  
  load = ()=>{
    return new Promise((resolve, reject) => {
        if (this.state.audioFile==false){
          return reject('Pas de fichier audio')
        }
      
  
      this.sound= new Sound(this.state.audioFile, '', err =>{
          if (err){
            console.error(err)
            return reject(err)
          }
          this.setState({loaded:true})
          return resolve()
        })
    })
  }
  
  play = async ()=>{
    if ( this.state.loaded==false){
      try {
        await this.load()
      }
      catch (err){
        console.error(err)
      }
    }
  
    this.setState({paused:false})
    Sound.setCategory("Playback")
    this.sound.play(success=>{
      this.setState({paused:true})
    })
  
  }

validerSon(){
  
  this.play()
  
}

supprimerSon(){
  alert("Feature soon ")
  this.props.navigation.navigate('Sounds')

  
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
              <Ionicons size={40} name="mic-outline"/>
              <Ionicons size={40} name="play-outline" />
            
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




