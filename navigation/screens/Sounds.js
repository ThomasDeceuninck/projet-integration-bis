import { useNavigation } from "@react-navigation/native";
import * as React from "react"
import { View,Text, Button , ScrollView, StyleSheet} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Sounds({navigation}){


    const [sounds,setSounds]=React.useState([
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
    

 

    const addSound = ()=> {
      alert("adding sound soon")
    }


    return (
        <View>
        <Button style={{justifyContent: 'center'}}
        title='Ajouter un son'
        onPress={addSound}></Button>
        <ScrollView >
        {sounds.map((item) =>{
          return ( 
              <View style={styles.item}>
                <Text onPress={()=>navigation.navigate('SoundSettings', {key:item.key})} >{item.title}</Text>
              </View>
              
          )
        })}
        </ScrollView>
        
    </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#89CFF0',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      textAlign:'center',
      
    },
    title: {
      fontSize: 32,
    },
  });
  