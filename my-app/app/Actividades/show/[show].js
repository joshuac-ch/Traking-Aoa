import axios from 'axios'
import React, { useEffect, useState } from 'react'
import constantes from "expo-constants"
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IconElipsis, IconHeart, IconReply } from '../../../assets/Icons'
import PublicacionComponent from '../../../components/PublicacionComponent'
export default function ShowActividadUser() {
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
        if(creatorUser){
            ShowUserCreator()
        }
    },[creatorUser])
    return (
    <>
    <PublicacionComponent datosUser={dataCreator} datasRutina={dataActividaes}></PublicacionComponent>
    </>
  )
}
