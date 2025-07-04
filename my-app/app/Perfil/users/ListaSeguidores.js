import React, { useCallback, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { IconBack} from '../../../assets/Icons'
import { useUser } from '../../../components/UserContext'
import axios from 'axios'
import { useFocusEffect } from 'expo-router'
import constantes from "expo-constants" 

export default function ListaSeguidores() {
  const {user}=useUser()
    const host=constantes.expoConfig.extra.host
    const [DataUser, setDataUser] = useState([])
    const ShowUser=async()=>{
    const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
    setDataUser(data)
  }
  
  useFocusEffect(
    useCallback(()=>{
        ShowUser()       
    },[])
    
  ) 
    
  return (
    
    <>
         <View style={{margin:10}}>
                <View>
                    <IconBack></IconBack>
                </View>
                <View>
                    <Text>{DataUser.correo}</Text>
                </View>                
                
            </View>
        </>
  )
}
