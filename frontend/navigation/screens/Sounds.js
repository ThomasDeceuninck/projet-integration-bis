import { useNavigation } from "@react-navigation/native";
import * as React from "react"
import { View,Text, Button , ScrollView, StyleSheet, TouchableOpacity} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as db from '../../DBCreation'

import SoundSettings from "./SoundSettings";


export default class Sounds extends React.Component{
  constructor(props){
    super(props)
    this.state={
      sounds: [{ title: 'Test1', key:1,isChecked: true},
      { title: 'Test2', key:2, isChecked: true},
      { title: 'Test3', key:3, isChecked: true},
      { title: 'Test4', key:4, isChecked: true},
      { title: 'Test5', key:5, isChecked: true},
      { title: 'Test6', key:6, isChecked: true},
      { title: 'Test7', key:7, isChecked: true},
      { title: 'Test8', key:8, isChecked: true},
      { title: 'Test9', key:9, isChecked: true}]
      
    }
  }

    /*const [sounds,setSounds]=React.useState([
        { title: 'Test1', key:'1'},
        { title: 'Test2', key:'2'},
        { title: 'Test3', key:'3'},
        { title: 'Test4', key:'4'},
        { title: 'Test5', key:'5'},
        { title: 'Test6', key:'6'},
        { title: 'Test7', key:'7'},
        { title: 'Test8', key:'8'},
        { title: 'Test9', key:'9'},


    ]);
    
<Text onPress={()=>this.props.navigation.navigate('SoundSettings')} >{item.title}</Text> ---------------
 */

    addSound() {    //Envoie vers la page de détails pour enregistrer un son
      this.props.navigation.navigate('SoundSettings')
      //db.createTableSpecialWords()
    }


    selectItem(data){             // Permet de choisir si l'on veut être averti ou pas d'un son spécial qu'on a enregistré
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

        <ScrollView >
        {this.state.sounds.map((item) =>{
          return ( 
              <TouchableOpacity
              style={styles.item}
              onPress={ () => this.selectItem(item.key)}
              onLongPress={ ()=> this.props.navigation.navigate({ name:'SoundSettings', key:item.key})}
            >


              

              <Text style= {{ fontSize:20,fontWeight:'bold'}}> {item.title}</Text>
              <Text style={{fontSize:10}}>{item.isChecked ? 'Sélectionné': ""}</Text>

              </TouchableOpacity>
              
          )
        })}

        <Button title=" Ajouter un son" onPress={() => this.addSound()}></Button>
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
      alignItems:'center'
    },
    item: {
      backgroundColor: '#89CFF0',
      height: 55,
      width:'80%',
      borderRadius: 12,
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems: 'center',
      marginTop: 20,
      paddingHorizontal:10,
      
      
    },
    title: {
      fontSize: 32,
    },

  });
  