import axios from 'axios'
import React, { useEffect, useState } from 'react'
import constantes from "expo-constants"
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
export default function show() {
    const host=constantes.expoConfig.extra.host
    const [creatorUser, setcreatorUser] = useState("")
    const [dataCreator, setdataCreator] = useState([])
    const {show}=useLocalSearchParams()
    const [dataActividaes, setdataActividaes] = useState([]) 
    const showActividades=async()=>{
        const {data}=await axios.get(`http://${host}:4000/actividades/s/${show}`)
        setdataActividaes(data)
        setcreatorUser(data.usuario_id)
    }
    
    const ShowUserCreator=async()=>{
        const {data}=await axios.get(`http://${host}:4000/usuarios/s/${creatorUser}`)
        setdataCreator(data)
    }

    useEffect(()=>{
        showActividades()
    },[])
    useEffect(()=>{
        if(showActividades){
            ShowUserCreator()
        }
    },[showActividades])
    return (
    <>
    <View style={{flexDirection:'row',padding:10}}>
        <View>
            <Image source={{uri:dataCreator.imagen}} style={{width:60,height:60,borderRadius:10}}></Image>
        </View>
        <View>
            <Text style={{fontWeight:'bold'}}>Creador</Text>
            <Text>{dataCreator.nombre}</Text>
            <Text>{dataCreator.correo}</Text>
        </View>
    </View>
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
