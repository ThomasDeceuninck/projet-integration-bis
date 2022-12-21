import * as React from "react"
import { View,Text } from "react-native"

class HomeScreen extends React.Component{
    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Bluetooth" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Bluetooth Home Screen</Text>
        </View>
          );
    }
}

export default HomeScreen