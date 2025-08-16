import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TextInput } from 'react-native'
import { Image, Text, View } from 'react-native'
import { useUser } from './UserContext'
import axios from 'axios'
import constantes from "expo-constants"
import { useFocusEffect } from 'expo-router'
import {  IconDislike, IconDown, IconHeartComent } from '../assets/Icons'
import GetImage from '../utils/GetImage'
export default function Comentario({pubID}) {
  const {user}=useUser()
  const host=constantes.expoConfig.extra.host
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
      if(publicar.comentario!==""){
        await axios.post(`http://${host}:4000/comentarios/publicaciones`,publicar)
        alert("Se creo el comentario")
        setloadding(false)
        GetComentariosPub()
      }else{
        alert("comentario vacio")
        setloadding(false)
      }
    }catch(err){
        alert(err.message)
        console.err(err.message)
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
          <View style={{flexDirection:"row"}}>
            <Image source={{uri:GetImage(creador.imagen)}} style={styles.creador}></Image>
            <TextInput value={publicar.comentario}  onChangeText={text=>setpublicar({...publicar,comentario:text})} style={{paddingLeft:10}} placeholder='ingrese comentario'></TextInput>
          </View>
          <View>
          {loadding?
            <ActivityIndicator></ActivityIndicator>
          :
           <Pressable onPress={CreateComentario} style={styles.boton}>
            <View>
            <Text style={{color:"white"}}>Enviar</Text>
            </View>
          </Pressable>
          }
          </View>
        </View>
    </View>
    <View>
      <View style={{flexDirection:"row",justifyContent:"space-between",margin:30}}>
        <Text>Comentarios</Text>
        <IconDown></IconDown>
      </View>
      <View >
        {comentario.length>0?
        comentario.map((c)=>{
          return(
            <View style={{flexDirection:"row",marginBottom:5}} key={c.comentario.id}>
              <View>
                <Image source={{uri:GetImage(c.creador.imagen)}} style={{margin:5,width:50,height:50,borderRadius:50}}></Image>
              </View>
              <View style={{backgroundColor:"#c9c9c9",padding:5,marginLeft:5,marginRight:5,flex:1,borderRadius:10}}>
                <Text style={{fontWeight:"bold"}}>{c.creador.nombre}{c.creador.apellido}</Text>
                <Text>{c.comentario.comentario}</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                  <Text>20 h</Text>
                  <Text>Responder</Text>
                  <View style={{flexDirection:"row",alignItems:"center"}}>
                    <IconHeartComent></IconHeartComent>
                    <Text style={{marginLeft:5}}>30</Text>
                  </View>
                  <IconDislike></IconDislike>                  
                </View>
              </View>
              
            </View>
          )
        })
        :
        <View style={{alignSelf:"center",margin:10}}>
          <Text style={{fontWeight:"bold"}}>No hay comentarios</Text>
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
    backgroundColor:"purple",
    paddingTop:10,
    paddingRight:15,
    paddingBottom:10,
    paddingLeft:15,
    borderRadius:10
    }
})
