import * as React from "react"
import { View , Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './screens/HomeScreen';
import Settings from './screens/Settings';
import Sounds from './screens/Sounds';
import SoundSettings from "./screens/SoundSettings";
import StackNav from './StackNav'
//Screens names

const homeName= 'Home';
const soundsName= 'Sounds';
const settingsName= 'Settings';

const Tab= createBottomTabNavigator()
const Stack= createNativeStackNavigator()


const SoundStack= ()=>{
  return (
    <Stack.Navigator >
      <Stack.Screen name='Sounds2' component={Sounds} options={{headerShown:false}}/>
      <Stack.Screen name='SoundSettings' component={SoundSettings} options={{ title: ""}}/>

    </Stack.Navigator>
  )
}

const TabNavigator= ()=> {
    return (
      

<NavigationContainer>
  
  <Tab.Navigator 
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === soundsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#89CFF0',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen}  options={{headerShown:false}}/>
        <Tab.Screen name={soundsName} component={SoundStack} options={{headerShown:false}} />
        <Tab.Screen name={settingsName} component={Settings} options={{headerShown:false}}/>

      </Tab.Navigator>
   </NavigationContainer>
    );
}

export default TabNavigator;



 
  