import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import constantes from "expo-constants"
import PublicacionComponent from '../../../components/PublicacionComponent'
import getHost from '../../../hooks/getHost'
export default function ShowHabitosUser() {
    const [dataHabito, setdataHabito] = useState([])
    const [userCreator, setuserCreator] = useState(null)
    const [dataCreator, setdataCreator] = useState([])
    const {show}=useLocalSearchParams()
    const host=getHost()
    const {publi}=useLocalSearchParams()
    
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
    <PublicacionComponent datasRutina={dataHabito} datosUser={dataCreator} publicacionID={publi}></PublicacionComponent>
   </>
  )
}
