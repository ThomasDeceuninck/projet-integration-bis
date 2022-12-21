import * as React from "react"
import { View,Text, StyleSheet, range, Button } from "react-native"
import Slider from '@react-native-community/slider'

import * as db from '../../DBCreation'




/*const getdB= ()=>{
  db.transaction(txn=> 
    {
      txn.executeSql('SELECT valeur FROM tabledB WHERE title ==\'new\';',
      [],
      (sqlTxn, res)=> {
        let len = res.rows.length;
        if (len >0){
          let valdB= res.rows
          setValeurdB(valdB)
          
          
        }

      },
      (txn,error)=>{ console.log('Error on get ' + error) }
      )
    }
  )
} 

const setdB= () => {
  db.transaction(txn =>
    txn.executeSql('UPDATE tabledB SET valeur=? WHERE title == \'new\';',
    [range],
    (txn, res)=> {
      console.log("db updated")

    },
    (txn,error)=>{ console.log(error) }
    )
  )

}

const addData= ()=> {
  db.transaction(txn=> 
    {
      txn.executeSql('CREATE TABLE tabledB ( title VARCHAR(20), valeur INT);')
      txn.executeSql('INSERT INTO tabledB ( title, valeur) VALUES ( \'default\', 50);')
      txn.executeSql('INSERT INTO tabledB ( title, valeur) VALUES ( \'new\', 30);')

    }
  )

}*/

export default class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state={
      range
    }
  }


  setRange(data){

    return this.setState({range:data})
  }

  test(){
    db.setdB(10)
    console.log( "getdb:" + db.getdB())
  }

  setdB(){
    db.setdB(range)
    console.log(typeof range)
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
              value={db.getdB()} // MODIFIER POUR METTRE A LA VALEUR STOCKEE EN DB
              onValueChange= {value => this.setRange(Math.floor(value))}
              onSlidingComplete= {this.setdB}
              />
          <Button
          title="oui"
          onPress={this.test}/>
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
  });

