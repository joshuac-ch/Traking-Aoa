import axios from 'axios'
import React, { useEffect, useState } from 'react'
import constantes from "expo-constants"
import { Stack, useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IconElipsis, IconHeart, IconReply } from '../../../assets/Icons'
import PublicacionComponent from '../../../components/PublicacionComponent'
import getHost from '../../../hooks/getHost'
export default function ShowActividadUser() {
    const host=getHost()
    const [creatorUser, setcreatorUser] = useState("")
    const [dataCreator, setdataCreator] = useState([])
    const {show}=useLocalSearchParams()
    const [dataActividaes, setdataActividaes] = useState([]) 
    const {publi}=useLocalSearchParams()
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
        if(creatorUser){
            ShowUserCreator()
        }
    },[creatorUser])

    return (
    <>
    <Stack.Screen options={{title:'Publicacion',headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
    <PublicacionComponent datosUser={dataCreator} datasRutina={dataActividaes}  publicacionID={publi}></PublicacionComponent>
    </>
  )
}
