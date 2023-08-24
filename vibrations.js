import { Vibration } from "react-native";

const vibrations= [
    { title: 'Vibration1', key:'0',isChecked: false, sequence: [300,500,300,500,300,1000,]},
    { title: 'Vibration2', key:'1',isChecked: false, sequence: [100,1000,100,1000,100,1000]},
    { title: 'Vibration3', key:'2',isChecked: false, sequence: [100,500,100,500,100,500]},
    ]

export const vibreur= (index)=>{
    Vibration.vibrate(vibrations[index].sequence)
}