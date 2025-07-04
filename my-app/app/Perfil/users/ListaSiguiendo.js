import React, { useCallback, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { IconBack} from '../../../assets/Icons'
import { useUser } from '../../../components/UserContext'
import axios from 'axios'
import { useFocusEffect } from 'expo-router'
import constantes from "expo-constants" 

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
        const {data}=await axios.get(`http://${host}:4000/listaseguidores/usuario/${user.id}`)
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
    <View style={{margin:10}}>
                    <View>
                        <IconBack></IconBack>
                    </View>
                    <View>
                        <Text>{DataUser.correo}</Text>
                    </View>
                    {misSeguidores.length>0?
                    misSeguidores.map((m,i)=>{
                        return(
                            <View key={i}>
                                <View>
                                    <Image source={{uri:m.creador.imagen}} style={{height:50,width:50,borderRadius:50}}></Image>    
                                </View>                        
                                <View>
                                    <Text>{m.creador.nombre}</Text>
                                    <Text>{m.creador.correo}</Text>
                                </View>
                            </View>
                        )   
        
                    })
                    :
                    <Text>No sigo a nadie </Text>
                    }
                    
                </View>
    </>
  )
}
