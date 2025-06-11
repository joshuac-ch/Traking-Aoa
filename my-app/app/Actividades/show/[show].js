import axios from 'axios'
import React, { useEffect, useState } from 'react'
import constantes from "expo-constants"
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
export default function show() {
    const host=constantes.expoConfig.extra.host
    const {show}=useLocalSearchParams()
    const [dataActividaes, setdataActividaes] = useState([]) 
    const showActividades=async()=>{
        const {data}=await axios.get(`http://${host}:4000/actividades/s/${show}`)
        setdataActividaes(data)
    }
    useEffect(()=>{
        showActividades()
    },[])
    return (
    <>
    <View>
        <Text>{dataActividaes.titulo}</Text>
    </View>
    <View>
        <Image style={styles.imagen} source={{uri:dataActividaes.imagen}}></Image>
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    imagen:{
        width:150,
        height:200,
        margin:10,
        borderRadius:20
    }
})
