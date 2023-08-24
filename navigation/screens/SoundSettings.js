import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable,Button,Vibration } from "react-native";
import { Audio } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as iot from '../../sendToIoT'

import * as vib from '../../vibrations' 


class SoundSettings extends Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.state = {
      isRecording: false,
      isPlaying: false,
      selectedButton: null,
      sounds: [
        { title: 'Test1', key: '0', isChecked: true },
        { title: 'Test2', key: '1', isChecked: true },
        { title: 'Test3', key: '2', isChecked: true },
      ],
      titleInput: '', 
      titleHolder:'',
    };
  }

  componentDidMount() {
    const selectedKey = this.props.route.params.selectedKey;
    console.log("key loaded:" + selectedKey);
    this.loadSounds()
  }

  saveSounds = async () => {
    try {
      const soundsToSave = JSON.stringify(this.state.sounds);
      await AsyncStorage.setItem('soundsData', soundsToSave);
      console.log('Sons enregistrés avec succès.');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des sons :", error);
    }
  };

  loadSounds = async () => {
    try {
      const savedSounds = await AsyncStorage.getItem('soundsData');
      if (savedSounds !== null) {
        this.setState({ sounds: JSON.parse(savedSounds) });
        for ( let x of this.state.sounds){
          if (x.key == this.selectedKey){
              this.setState({titleHolder:x.title})
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des sons :", error);
    }
  };

  startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      this.setState({ isRecording: true });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      this.recording = recording;
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  stopRecording = async () => {
    this.setState({ isRecording: false });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  playRecording = async () => {
    try {
      const { sound } = await this.recording.createNewLoadedSoundAsync();
      this.sound = sound;
      await this.sound.playAsync();
      this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    } catch (error) {
      console.error('Error playing recording:', error);
    }
  };

  stopPlaying = async () => {
    if (this.sound) {
      await this.sound.stopAsync();
    }
  };

  onPlaybackStatusUpdate = (status) => {
    if (!status.isPlaying) {
      this.setState({ isPlaying: false });
    }
  };
  handleVibration= (index) =>{
    
    vib.vibreur(index)
    console.log(index)

    

  }

  handleButtonPress = (buttonIndex) => {

    this.setState((prevState) => ({
      selectedButton: prevState.selectedButton === buttonIndex ? null : buttonIndex,
    }));
 };

 updateSoundTitle = () => {
  const { selectedKey, titleInput, sounds } = this.state;

  const updatedSounds = sounds.map(sound => {
    if (sound.key === selectedKey) {
      return {
        ...sound,
        title: titleInput,
      };
    }
    return sound;
  });

  this.setState({ sounds: updatedSounds });
}
  



  

  render() {
    const { isRecording, isPlaying, titleInput } = this.state;
    const { selectedButton } = this.state;


    return (
      <View style= {{ alignItems:'center'}}>
          <View style={styles.horizontalLine}></View>
          <View style={{marginBottom: 50,}}></View>

            <TextInput
            style={styles.input}
            placeholder="Description"
            value={titleInput}
            onChangeText={text => this.setState({ titleInput: text })}
          />
           
           <View style={styles.notCentered}>

            <TouchableOpacity 
            onPress={isRecording ? this.stopRecording : this.startRecording}>
            <Ionicons 
            size={40} 
            name= {isRecording? "mic-outline" : "mic-off-outline"}
            style={[styles.icon, isRecording? {color:"green"} : {color:'red'}]}/>
            </TouchableOpacity>
            
            
            <TouchableOpacity
            onPress={this.playRecording}>
            <Ionicons size={40} name="play-outline" 
              style={styles.icon}/>
            </TouchableOpacity>
            </View>

            
            <TouchableOpacity
          style={[styles.item, selectedButton === 0 && styles.selectedButton]}
          onPress={() => this.handleVibration(0)}
        >
          <Text>Vibration 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, selectedButton === 1 && styles.selectedButton]}
          onPress={() => this.handleVibration(1)}
        >
          <Text>Vibration 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, selectedButton === 2 && styles.selectedButton]}
          onPress={() => this.handleVibration(2)}
        >
          <Text>Vibration 3</Text>
        </TouchableOpacity>


        <View style={{marginBottom: 50,}}></View>
        <View style={styles.horizontalLine}></View>
        <View style={{marginBottom: 40}}></View>


        <View style={styles.notCentered}>

  
        <Pressable
          style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 4, elevation: 3, backgroundColor: '#90EE90', margin: 10, width: '40%' }}
          title='Valider'
          onPress={() => {
            this.updateSoundTitle(); 
            this.saveSounds(); 
            this.props.navigation.goBack(); 
            iot.publishMessage("DétectionMsg",this.state.titleInput)
          }}
        >
          <Text> Valider</Text>
        </Pressable>
      </View>
      </View>
      
      
    );
  }
}
const styles = StyleSheet.create({
  horizontalLine: {
    width: '100%', 
    borderBottomWidth: 1, 
    borderColor: 'black', 
  },
  notCentered:{ 
    flexDirection: 'row',   
   justifyContent: 'center',
    
   
},
icon: {
  alignSelf: 'flex-end',  
  margin: 10,
  backgroundColor:'#CCD1D1',
  borderRadius:50
},
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 100,
    textAlign: 'center',
    backgroundColor:"white"
  },
  selectedButton: {
    backgroundColor: '#CCD0D1',
    borderWidth:1
  },

 
  item: {
    borderWidth:1,
    backgroundColor: 'white',
    height: 40,
    width:'60%',
    borderRadius: 12,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal:10,
    textAlign:'center',
    
    
  },

})
  

export default SoundSettings;
