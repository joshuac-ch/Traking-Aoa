import React, { useCallback, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { IconAddPerson, IconBack } from '../../../assets/Icons'
import { useUser } from '../../../components/UserContext'
import ListaSeguidores from './ListaSeguidores'
import ListaSiguiendo from './ListaSiguiendo'
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import constantes from "expo-constants"
import getHost from '../../../hooks/getHost'
export default function ListaPrincipal(){
    const host=getHost()
    const {estado,usuario}=useLocalSearchParams()    
    const [estadofollow, setestadofollow] = useState(estado)   
    const {user}=useUser()
    const [dataUser, setdataUser] = useState([])
    const vistaUsuario=usuario||user.id
    const ShowUserPrincipal=async()=>{
        const {data}=await axios.get(`http://${host}:4000/usuarios/s/${vistaUsuario}`)
        setdataUser(data)
    }    
    useFocusEffect(
        useCallback(()=>{           
                ShowUserPrincipal()            
        },[vistaUsuario])
    )    
    return(
    <> 
    <Stack.Screen options={{title:'Lista Principal',headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
    <ScrollView style={{backgroundColor:"#131313"}}>   
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",margin:10}}>
        <View>
            <IconBack color='white'></IconBack>
        </View>
        <View>
            <Text style={{color:"white"}}>{dataUser.correo}</Text>
        </View>
        <View>
            <IconAddPerson color='white'></IconAddPerson>
        </View>
    </View>
    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:10}}>
        <Pressable onPress={()=>setestadofollow("siguiendo")}>
            <View>
            <Text style={{color:"white"}}>Siguiendo</Text>
        </View>
        </Pressable>        
        <Pressable onPress={()=>setestadofollow("seguidores")}>
            <View>
            <Text style={{color:"white"}}>Seguidores</Text>
        </View>
        </Pressable>
        
    </View>
    <View>
        {estadofollow=="siguiendo"?
        <ListaSiguiendo usuario={vistaUsuario}></ListaSiguiendo>
        :
        <ListaSeguidores usuario={vistaUsuario}></ListaSeguidores>
        }
    </View>
    </ScrollView>
    </>
  )
}
