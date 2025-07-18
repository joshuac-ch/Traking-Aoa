import React, { useCallback, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { IconBack} from '../../../assets/Icons'
import { useUser } from '../../../components/UserContext'
import axios from 'axios'
import { useFocusEffect } from 'expo-router'
import constantes from "expo-constants" 
import ListaFollos from '../../../components/ListaFollos'

export default function ListaSiguiendo() {
    const {user}=useUser()
    const host=constantes.expoConfig.extra.host
    const [DataUser, setDataUser] = useState([])
    const ShowUser=async()=>{
    const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
    setDataUser(data)
  }
  const [misSeguidores, setmisSeguidores] = useState([])  
  const ShowSeguidores=async()=>{
        const {data}=await axios.get(`http://${host}:4000/listasiguiendo/usuario/${user.id}`)
        setmisSeguidores(data)
    }
  useFocusEffect(
    useCallback(()=>{
        ShowUser()
        ShowSeguidores()
    },[])
    
  ) 
  return (
    <>    
    <ListaFollos user={DataUser} lista={misSeguidores} info={"Siguiendo"}></ListaFollos>
    </>    
    
  )
}
