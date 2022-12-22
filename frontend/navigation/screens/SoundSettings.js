import { useNavigation } from "@react-navigation/native";
import * as React from "react"
import { View,Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Item, PermissionsAndroid } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import Permissions from "react-native-permissions"
import Sound from 'react-native-sound'
import AudioRecord from "react-native-audio-record"
import {Buffer} from 'buffer'
import { openDatabase } from "react-native-sqlite-storage";

 



import Sounds from "./Sounds";

var db = openDatabase({ name: 'testdb.db3' }, ()=>{ console.log("Connected to db")},()=>{ console.log("db failed")}); //Connecxion à la db


export default class SoundSettings extends React.Component{


    sound=null
    state={
      vibrations: [
      { title: 'Vibration1', key:1,isChecked: false},
      { title: 'Vibration2', key:2,isChecked: false},
      { title: 'Vibration3', key:3,isChecked: false},
      { title: 'Vibration4', key:4,isChecked: false}
      ],
      recording:false,
      audioFile: "",
      loaded:false,
      paused:true,
      text:"Description",
      vibrationSelected:null
    }

    async componentDidMount(){
      this.checkPermSound()
      const options= {
        sampleRate: 16000,
        channels:1,
        bitPerSample:16,
        wavFile: this.state.text + ".wav"
      }
    
      AudioRecord.init(options) //Initialisation de l'audio
    
      AudioRecord.on("data", data=>{
        const chunk= Buffer.from(data, "base64")
        
      })
    }
  
    checkPermSound= async ()=>{     //Demande à l'utilisateur d'autoriser l'application à utiliser le micro
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
  
  startRecording= ()=>{     //Lance le début de l'enregistrement
    this.setState({audioFile: "", recording:true, loaded:false})
    AudioRecord.start()
  }
  
  stopRecording= async ()=>{    //Arrête l'enregistrement et enregistre l'audio dans la variable audioFile
  
    if (this.state.recording==false){
      return
    }
    let audioFile=  await AudioRecord.stop()
    this.setState({audioFile, recording:false})
    let audioData= audioFile
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
  
  play = async ()=>{        // Joue l'enregistrement audio
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


selectItem(data){         //Permet de choisir la vibration, en appuyant sur une des vibrations, son paramètre isCheckec passe à true et met celui de tous les autres à False
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
    this.setVibrations()
}

setText(data){
 return this.setState({text:data})
}

setVibrations(){      //Regarde parmi toutes les vibrations laquelle à son paramètre isChecked à true et l'envoie dans la variable vibrationSelected qui sera ensuite envoyée en db
  for ( let x = 0; x<this.state.vibrations.length;x++){
     if ( this.state.vibrations[x].isChecked==true){
      console.log(this.state.vibrations[x].isChecked)
      return this.setState({vibrationSelected:this.state.vibrations[x].key})
     }
  }
}


validerSon(){           // Envoie la description, le booleen isChecked, l'audio et la vibration en base de données ---- La requête ne fonctionne pas je ne comprends pas pq ----
  //this.selectAll()
      db.transaction(function (txn) {
          txn.executeSql(
            "INSERT INTO specialwords (description, isChecked, audio, vibration) VALUES ( ? , ? , ? , ? )", [this.state.text, true, this.state.audioFile, this.state.vibrationSelected],
              (txn, results) => {
                console.log("Données envoyées")
                console.log('Results', results.rowsAffected);
              },
              ()=>{console.error("DONNEES NON ENVOYEES")}
          );
      });
      
      console.log(this.state.text)
      console.log(this.state.audioFile)
      console.log(this.state.vibrationSelected)
}

supprimerSon(data){ //Supprime la ligne du mot enregistré
  db.transaction(function (txn) {
    txn.executeSql("DELETE FROM specialwords WHERE desc = ?", [data], ()=>{ console.log('row dropped')}, ()=>{ console.log("Row didn't drop")})
  })

}

createTableSpecialWords(){ // supprime la table specialwords si elle existe déja et en recrée une nouvelle
  db.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS specialwords', [], ()=>{console.log("DROPPED")}, ()=>{console.error("not dropped")});
    txn.executeSql("CREATE TABLE IF NOT EXISTS specialwords (id INTEGER PRIMARY KEY AUTOINCREMENT,description TEXT,isChecked BOOLEAN,audio BLOB, vibration INT)", [], ()=>{console.log("table special words created succesffully")}, ()=>{console.error(error.message)});
  })

};

selectAll(){ //Affiche toutes les tables présentes en console, utile juste en dev
 db.transaction(function (txn) {
      txn.executeSql(
          "SELECT * FROM sqlite_master WHERE type='table'",
          [],
          function (tx, res) {
              console.log(res.rows.length)
          var  x = 0
              for ( let x =0; x < res.rows.length; x++){
                  console.log(res.rows.item(x))
              }
             
          }
      );
  })

};




  render(){
    const param= this.props.route.params
    const { navigation } = this.props
    return (
        <View style= {{ alignItems:'center'}}>
            <TextInput 
              style={styles.input} 
              placeholder="Type here to translate!"
              onChangeText={newText => this.setText(newText)}
                  
              
              />
              <TouchableOpacity 
              onPressIn={this.startRecording}
              onPressOut={this.stopRecording}>

                   <Ionicons size={50} name="mic-outline"/>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={this.play}>
                   <Ionicons size={50} name="play-outline" />
              </TouchableOpacity>
            
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




