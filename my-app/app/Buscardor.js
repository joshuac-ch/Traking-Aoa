import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { IconSeach } from '../assets/Icons'

export default function Buscardor() {
  return (
   <>
   <View style={styles.buscar}>
    <TextInput style={styles.input_buscar} placeholder='buscar...'></TextInput>
    <IconSeach></IconSeach>
   </View>
   </>
  )
}
const styles=StyleSheet.create({
    buscar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        margin:10        
    },
    input_buscar:{
        borderStyle:'solid',
        borderWidth:2,
        width:340,
        borderColor:'black'
    }
})
