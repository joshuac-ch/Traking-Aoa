import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import constantes from "expo-constants"
export default function show() {
    const [dataHabito, setdataHabito] = useState([])
    const [userCreator, setuserCreator] = useState(null)
    const [dataCreator, setdataCreator] = useState([])
    const {show}=useLocalSearchParams()
    const host=constantes.expoConfig.extra.host
    const showHabito=async()=>{
        const {data}=await axios.get(`http://${host}:4000/habitos/s/${show}`)
        
        setdataHabito(data)
        
        setuserCreator(data.usuario_id)
    }
    const showUserCreate=async()=>{
        const {data}=await axios.get(`http://${host}:4000/usuarios/s/${userCreator}`)
        setdataCreator(data)
        
    }
    useEffect(()=>{
        showHabito()
    },[]) 
    useEffect(()=>{
        if(userCreator){
            showUserCreate()
        }       
    },[userCreator])//simepre no olvidar la dependencia 
    
    return (
   <>
   <View style={{display:'flex',flexDirection:'row',padding:10}}>
    <View >
        <Image source={{uri:dataCreator.imagen}} style={{width:60,height:60,borderRadius:10,marginRight:10}}></Image>
    </View>
    <View>
        <Text style={{fontWeight:'bold'}}>Creador</Text>
        <Text>{dataCreator.nombre}</Text>
        <Text>{dataCreator.correo}</Text>
    </View>        
   </View>

   <View style={{padding:10}}>
    
    
    <View>
        <Image style={styles.imagen} source={{uri:dataHabito.imagen}}></Image>
    </View>
    <View>
        <Text>Titulo: </Text>
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