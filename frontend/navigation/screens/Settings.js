import * as React from "react"
import { View,Text, StyleSheet, range, Button } from "react-native"
import Slider from '@react-native-community/slider'
import { openDatabase } from "react-native-sqlite-storage"




var db = openDatabase({ name: 'testdb.db3' }, ()=>{ console.log("db created")},()=>{ console.log("db failed")});



/*
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
      range:this.getdB()
    }
  }

  selectAll(){
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



  getdB(){

    db.transaction((tx) => {
        tx.executeSql(
            "SELECT valeur FROM settings WHERE name == 'seuil';",
            [],
            (tx, results) => {
                
                
                if (results.rows.length>0){
                    var temp = results.rows.item(0).valeur;
                    console.log(" VALEUR DANS LA DB:"+ temp)
                }
                return +temp
            }
        );
    });
  
  }

  setdB(data){
   db.transaction((tx) => {
        tx.executeSql(
            "UPDATE settings SET valeur= ? , name= 'seuil' WHERE name= 'seuil'",
        [data],(tx, results) => {
            console.log('SET REUSSI')
        },
        (err)=>{console.log('ERREUR SET DB')}
        )
    })
    /*db.transaction((tx) => {
      tx.executeSql("DELETE FROM SETTINGS WHERE name='seuil'"),[],()=>{
        console.log('delete done')
      }
      })

      db.transaction(function (tx) {
        tx.executeSql(
            "INSERT INTO settings (name, valeur) VALUES(?,?)", ['seuil', data],
            (tx, results) => {
            }
        );
    });*/
    this.getdB();
}


  setRange(data){

    return this.setState({range:data})
  }

  test(){
  this.selectAll()
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
              onSlidingComplete= {this.setdB(this.state.range)}
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
  });

