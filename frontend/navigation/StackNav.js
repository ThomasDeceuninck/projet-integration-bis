import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import Sounds from './screens/Sounds';
import Settings from './screens/Settings';
import SoundSettings from './screens/SoundSettings';

const Stack= createNativeStackNavigator();

const StackNav= ()=>{
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Sounds" component={Sounds}/>
      <Stack.Screen name="SoundSettings" component={SoundSettings}/>

    </Stack.Navigator>
      
  )
}

export default StackNav




