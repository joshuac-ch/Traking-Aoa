import React, { useCallback, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { IconAddPerson, IconBack } from '../../../assets/Icons'
import { useUser } from '../../../components/UserContext'
import ListaSeguidores from './ListaSeguidores'
import ListaSiguiendo from './ListaSiguiendo'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import constantes from "expo-constants"
export default function ListaPrincipal(){
    const host=constantes.expoConfig.extra.host
    const {estado}=useLocalSearchParams()    
    const [estadofollow, setestadofollow] = useState(estado)   
    const {user}=useUser()
    const [dataUser, setdataUser] = useState([])
    const ShowUserPrincipal=async()=>{
        const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
        setdataUser(data)
    }
    useFocusEffect(
        useCallback(()=>{
            if(user.id){
                ShowUserPrincipal()
            }
        },[user.id])
    )
    return(
    <>    
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",margin:10}}>
        <View>
            <IconBack></IconBack>
        </View>
        <View>
            <Text>{dataUser.correo}</Text>
        </View>
        <View>
            <IconAddPerson></IconAddPerson>
        </View>
    </View>
    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>
        <Pressable onPress={()=>setestadofollow("siguiendo")}>
            <View>
            <Text>Siguiendo</Text>
        </View>
        </Pressable>        
        <Pressable onPress={()=>setestadofollow("seguidores")}>
            <View>
            <Text>Seguidores</Text>
        </View>
        </Pressable>
        
    </View>
    <View>
        {estadofollow=="siguiendo"?
        <ListaSiguiendo></ListaSiguiendo>
        :
        <ListaSeguidores></ListaSeguidores>
        }
    </View>
    
    </>
  )
}
