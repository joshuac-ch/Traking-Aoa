import React, { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { IconBack} from '../../../assets/Icons'
import { useUser } from '../../../components/UserContext'
import axios from 'axios'
import { useFocusEffect } from 'expo-router'
import constantes from "expo-constants" 
import { Image } from 'react-native'
import ListaFollos from '../../../components/ListaFollos'

export default function ListaSeguidores() {
  const {user}=useUser()
    const host=constantes.expoConfig.extra.host
    const [DataUser, setDataUser] = useState([])
    const ShowUser=async()=>{
    const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
    setDataUser(data)
  }
  const [dataSeguidores, setdataSeguidores] = useState([])
  const ShowSeguidores=async()=>{
    const {data}=await axios.get(`http://${host}:4000/listaseguidores/usuario/${user.id}`)
    setdataSeguidores(data)
  }
  useFocusEffect(
    useCallback(()=>{
        ShowUser()
        ShowSeguidores()       
    },[])
    
  ) 
    
  return (
    <>
    <ListaFollos user={DataUser} lista={dataSeguidores} info={"Amigos"}></ListaFollos>
    </> 
    
  )
}
