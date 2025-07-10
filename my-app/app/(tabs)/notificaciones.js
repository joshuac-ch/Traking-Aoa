import React, { useCallback, useState } from 'react'
import { View,Text, StyleSheet, Image, ScrollView } from 'react-native'
import { IconElipsis, IconHome, IconLeft, IconSeach, IconUser } from '../../assets/Icons'
import { Stack, useFocusEffect } from 'expo-router'
import axios from 'axios'
import constantes from "expo-constants" 
import { useUser } from '../../components/UserContext'
export default function notificaciones() {
  const [notiUser, setnotiUser] = useState([])
  const {user}=useUser()
  const host=constantes.expoConfig.extra.host
  const notificaciones=async()=>{
    const {data}=await axios.get(`http://${host}:4000/notificaciones/xuser/${user.id}`)
    setnotiUser(data)
    //LO PRIMERA ARREGLAR LA TABLA EN EL BACKEND//
    //CREAR PRIMEROS LOS POST EN EL BACKEND //
    //CREAR LOS ME GUSTA ''//
    //EL SEGUIDOR '' Falta este 
  }
  const [likesuser, setlikesuser] = useState([])
  const notificacionesLikes=async()=>{
    const {data}=await axios.get(`http://${host}:4000/notificaciones/user/likes/${user.id}`)
    setlikesuser(data)
  }
  
  const [notifollow, setnotifollow] = useState([])
  const notificacionesFollow=async()=>{
    const {data}=await axios.get(`http://${host}:4000/notificaciones/user/follow/${user.id}`)
    setnotifollow(data)
  }

  useFocusEffect(
    useCallback(()=>{
      if(user.id){
        notificaciones(),
        notificacionesLikes(),
        notificacionesFollow()
      }
    },[user.id])
  )
  
  //Se creo por ahora que se vena las notificaciones si seguimos al usuarios
  //crear en el post (listo)
  //crear en el me gusta
  //crear en el me sigue
  return ( 
    <>
    <ScrollView>
    <Stack.Screen options={{headerShown:false}}></Stack.Screen>
    <View style={{marginTop:55}}></View>
    <View className='m-4'>
        <View>
          <Text>Bandeja de Entrada</Text>
        </View>
        {notiUser.length>0?
        <View>
          {notiUser.map((n,i)=>{
            return(
              n.noti.tipo=="Post_Actividad" || n.noti.tipo=="Post_habito"?
              <View key={i} style={{flexDirection:'row',justifyContent:"space-between",alignItems:"center"}} key={i}>
                <View style={{flexDirection:"row"}}>
                  <View>                  
                    <Image source={{uri:n.creador.imagen}} style={{height:50,width:50,borderRadius:50,marginRight:10}}></Image>
                  </View>
                  <View>
                    <Text>{n.creador.nombre } {n.noti.mensaje}</Text>
                    <Text>{n.post.titulo}</Text>
                    <Text>{n.post.descripcion}</Text>
                    <Image style={{width:100,height:100,borderRadius:20}} source={{uri:n.post.imagen}}></Image>
                  </View>
                </View>
                <View>
                  <IconElipsis></IconElipsis>
                </View>
                
              </View>
              :
              ""              
            )
          })}          
        </View>
        :
        <View>
          <Text>No hay notificaciones actualmente</Text>
        </View>
        }
        {likesuser.length>0?          
            likesuser.map((n,i)=>{
              return(               
                <View key={i} style={{flexDirection:"row",justifyContent:'space-between'}}>
                   <View style={{flexDirection:"row"}}>
                  <View>                  
                    <Image source={{uri:n.creador.imagen}} style={{height:50,width:50,borderRadius:50,marginRight:10}}></Image>
                  </View>
                  <View>
                    <Text>{n.noti.mensaje} a {n.creador.nombre}</Text>
                    <Text>{n.contenido.titulo}</Text>
                    <Image source={{uri:n.contenido.imagen}} style={{width:100,height:150,borderRadius:10}}></Image>
                  </View>
                </View>
                 <View><IconElipsis></IconElipsis></View>
                </View>
                
              )
            })        
        :""
        
        }
        {
          notifollow.length>0?
          notifollow.map((n,i)=>{
            return(
              <View key={i} style={{flexDirection:"row",justifyContent:'space-between'}}>
                  <View style={{flexDirection:"row"}}>
                  <View>                  
                    <Image source={{uri:n.user.imagen}} style={{height:50,width:50,borderRadius:50,marginRight:10}}></Image>
                  </View>
                  <View>
                    <Text>{n.follow.mensaje} {n.user.nombre}</Text>
                    
                  </View>
                </View>
                 <View><IconElipsis></IconElipsis></View>
              </View>
            )
          })
          :""
        }        
        
    </View>
    </ScrollView>
  </>
  )
}
const styles=StyleSheet.create({
  acti:{
    marginTop:10,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  icon_acti:{
    borderRadius:50,
    borderWidth:2,
    borderStyle:'solid',
    borderColor:'purple',
    padding:10,
    marginRight:10,
    backgroundColor:'purple',
  },
  content_Acti:{
    
  }
})
