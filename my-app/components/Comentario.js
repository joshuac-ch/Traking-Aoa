import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import { Image, Text, View } from 'react-native'
import { useUser } from './UserContext'
import axios from 'axios'
import constantes from "expo-constants"
import { useFocusEffect } from 'expo-router'
import {  IconDislike, IconDown, IconHeartComent, IconSend } from '../assets/Icons'
import GetImage from '../utils/GetImage'
import getHost from '../hooks/getHost'
export default function Comentario({pubID,estado=true}) {
  const {user}=useUser()
  const host=getHost()
  const [creador, setcreador] = useState([])
  const GetCreador=async()=>{
      const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
      setcreador(data)
  }
  useFocusEffect(
    useCallback(()=>{
        GetCreador()
    },[])
  )
  const [publicar, setpublicar] = useState({
    publicacion_id:pubID,
    usuario_id:user.id,
    like_user:0,
    tipo:"",
    comentario:""    
})
const [loadding, setloadding] = useState(false)
  const CreateComentario=async()=>{
    
    try{
      setloadding(true)
      if(publicar.comentario!=="" && estado){
        await axios.post(`http://${host}:4000/comentarios/publicaciones`,publicar)       
        //setloadding(false)
        GetComentariosPub()
        publicar.comentario=''
      }else{
        ToastAndroid.show("comentario vacio",ToastAndroid.BOTTOM)
        
        //setloadding(false)
      }
    }catch(err){       
        alert(err.message)
        console.err(err.message)
    }finally{
        setloadding(false)
    }
  }
  const [comentario, setcomentario] = useState([])
  const GetComentariosPub=async()=>{
    const {data}=await axios.get(`http://${host}:4000/comentarios/publicaciones/${pubID}`)
    setcomentario(data)
  }
  useFocusEffect(
    useCallback(()=>{
      GetComentariosPub()
    },[])
  )
  
  return (
     <>
     <View style={styles.contenedor}>              
        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <Image source={{uri:GetImage(creador.imagen)}} style={styles.creador}></Image>
            <TextInput value={publicar.comentario}  onChangeText={text=>setpublicar({...publicar,comentario:text})}
             style={{paddingLeft:10,backgroundColor:"#3f3f3f",color:"white",height:40,width:150,borderRadius:10,marginLeft:5,marginRight:5}} ></TextInput>
          </View>
          <View>
          {loadding?
            <ActivityIndicator></ActivityIndicator>
          :
           <Pressable onPress={CreateComentario} style={styles.boton}>
            <View>
            <IconSend color='white'></IconSend>
            
            </View>
          </Pressable>
          }
          </View>
        </View>
    </View>
    <View>
      <View style={{flexDirection:"row",justifyContent:"space-between",margin:30}}>
        <Text style={{color:"white"}}>Comentarios</Text>
        <IconDown color='white'></IconDown>
      </View>
      <View >
        {comentario.length>0?
        comentario.map((c)=>{
          return(
            <View style={{flexDirection:"row",marginBottom:5}} key={c.comentario.id}>
              <View>
                <Image source={{uri:GetImage(c.creador.imagen)}} style={{margin:5,width:50,height:50,borderRadius:50}}></Image>
              </View>
              <View style={{backgroundColor:"#3f3f3f",padding:5,marginLeft:5,marginRight:5,flex:1,borderRadius:10}}>
                <Text style={{fontWeight:"bold",color:"white"}}>{c.creador.nombre}{c.creador.apellido}</Text>
                <Text style={{color:"white"}}>{c.comentario.comentario}</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  <Text style={{color:"white"}}>{c.comentario.createdAt?new Date(c.comentario.createdAt).getMinutes()+"min":"s"}</Text>
                  <Text style={{color:"white"}}>Responder</Text>
                  <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <View style={{paddingLeft:5,flexDirection:"row",alignItems:"center",paddingRight:9}}>
                      <IconHeartComent color='white'></IconHeartComent>
                      <Text style={{textAlignVertical:"center",paddingLeft:3,color:"white"}}>0</Text>
                    </View>
                    <IconDislike color='white'></IconDislike>
                  </View>
                                    
                </View>
              </View>
              
            </View>
          )
        })
        :
        <View style={{alignSelf:"center",margin:10}}>
          <Text style={{fontWeight:"bold",color:"white"}}>No hay comentarios</Text>
        </View>
        }        
      </View>
    </View>  
     </>
  )
}
const styles=StyleSheet.create({
    contenedor:{
        
        marginTop:10,
        marginLeft:30,
        marginRight:30
    },
    creador:{
        borderRadius:50,
        width:50,
        height:50
    },
    boton:{
    backgroundColor:"#131313",
    paddingTop:8,
    paddingRight:8,
    paddingBottom:8,
    paddingLeft:8,
    borderRadius:10
    }
})
