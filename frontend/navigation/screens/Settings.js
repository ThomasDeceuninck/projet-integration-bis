import * as React from "react"
import { View,Text, StyleSheet, range, Button } from "react-native"
import Slider from '@react-native-community/slider'
import { openDatabase } from "react-native-sqlite-storage"




var db = openDatabase({ name: 'testdb.db3' }, ()=>{ console.log("Connected to db")},()=>{ console.log("db failed")});



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

  selectAll(){    //Permet de voir tous les tables existantes dans la DB, juste utile en dev
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



  getdB(){            //Get de la valeur seuil stockée en DB, elle est stockée dans une range de 200 à 800 et est transformée en une range de 0  à 100 grace à reverseTransformRangeToApp

    db.transaction((tx) => {
        tx.executeSql(
            "SELECT valeur FROM settings WHERE name == 'seuil';",
            [],
            (tx, results) => {
                
                
                if (results.rows.length>0){
                    var temp = results.rows.item(0).valeur;
                    console.log(" VALEUR DANS LA DB:"+ temp)
                }
                return this.reverseTransformRangeToApp(+temp)
            }
        );
    });
  
  }

  setdB(data){        // Set la valeur du seuil en fonction de ce qui est sur le slider, la valeur entre 0 et 100 est adaptée à une valeur entre 200 et 800
   db.transaction((tx) => {
        tx.executeSql(
            "UPDATE settings SET valeur= ? , name= 'seuil' WHERE name= 'seuil'",
        [this.transformRangeToDB(data)],(tx, results) => {
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


  setRange(data){           //Modifier la valeur de range(la valeur du slider)

    return this.setState({range:data})
  }

  test(){
  this.selectAll()
  }

  transformRangeToDB(value) { // Transforme la range de 0 à 100 du slider en une range de 200 à 800 dans la db
    return (value * 6) + 200;
  }

  reverseTransformRangeToApp(value) { // Trasnforme la range de 200 à 800 de la db en une range de 0 à 100 pour le slider
    return (value - 200) / 6;
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

