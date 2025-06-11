import axios from 'axios'
import React, { useEffect, useState } from 'react'
import constatnes from "expo-constants"
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
export default function ShowMetas() {
   const host=constatnes.expoConfig.extra.host 
   const {show}=useLocalSearchParams()
  const [dataMetas, setdataMetas] = useState([])
  const ShowMetas=async()=>{
    const {data}=await axios.get(`http://${host}:4000/metas/s/${show}`)
    setdataMetas(data)
  }
  useEffect(()=>{
    ShowMetas()
  },[])
  return (
  <>
    <View>
        <View><Text>{dataMetas.titulo}</Text></View>
        <View>
            <Image style={styles.imagen} source={{uri:dataMetas.imagen}}></Image>
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
        margin:20
    }
})
