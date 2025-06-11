import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import constantes from "expo-constants"
export default function show() {
    const [dataHabito, setdataHabito] = useState([])
    const {show}=useLocalSearchParams()
    const host=constantes.expoConfig.extra.host
    const showHabito=async()=>{
        const {data}=await axios.get(`http://${host}:4000/habitos/s/${show}`)
        
        setdataHabito(data)
    }
    useEffect(()=>{
        showHabito()
    },[]) 
    return (
   <>
   <View>
    <Text>ID del show {show} del usuario que estas viendo</Text>
    
    <View>
        <Image style={styles.imagen} source={{uri:dataHabito.imagen}}></Image>
    </View>
    <View>
        <Text>Titlo</Text>
        <Text>{dataHabito.titulo}</Text>
    </View>
   </View>
   </>
  )
}
const styles=StyleSheet.create({
    imagen:{
        width:150,
        height:200,
        borderRadius:20,
        boxShadow:"0px 0px 8px 1px black"
    }
})