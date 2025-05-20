import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View,Text, TextInput, Image, StyleSheet, Pressable } from 'react-native'
import constantes from "expo-constants"
import axios from 'axios'


export default function DetalleHabito() {
  const {id}=useLocalSearchParams()
  const navegar=useRouter()
  const host=constantes.expoConfig.extra.host
  const [FormDataHabitos, setFormDataHabitos] = useState({
    titulo:'',
    descripcion:'',
    frecuencia:'',
    activo:0,
    fecha_inicio:'',
    usuario_id:''
  })
  const FectHabitos=async()=>{
    try{
        const {data}=await axios.get(`http:/${host}:4000/habitos/s/${id}`)
        setFormDataHabitos({
            titulo:data.titulo,
            descripcion:data.descripcion,
            frecuencia:data.frecuencia,
            activo:data.activo,
            fecha_inicio:data.fecha_inicio,
            usuario_id:data.usuario_id
        })
    }catch(err){
        alert(err.message)
    }
  }
  const UpdateHabitos=async()=>{
    try{
        await axios.put(`http://${host}:4000/habitos/u/${id}`,FormDataHabitos)
        alert("Se actualizo los datos")
       // navegar.push("/Panel")
    }catch(err){
        alert(err.message)
    }
  }
  useEffect(()=>{
    FectHabitos()
  },[])     
    return (
    <>
    <Stack.Screen options={{title:`Habito N°${id}`}}></Stack.Screen>
    <View>
       {FormDataHabitos!=null?
       <View style={styles.contenedorP}>
            <View>
                 <Image source={{uri:'https://i.pinimg.com/736x/08/22/42/082242799a37614692811978f6f83c43.jpg'}} style={{width:250,height:300,borderRadius:20}}></Image>
            </View>
            <View>
                <Text>Titulo: </Text>
                <TextInput onChangeText={text=>setFormDataHabitos({...FormDataHabitos,titulo:text})}  value={FormDataHabitos.titulo}></TextInput>
            </View>
            <View>
                <Text>Descripcion: </Text>
                <TextInput onChangeText={text=>setFormDataHabitos({...FormDataHabitos,descripcion:text})} value={FormDataHabitos.descripcion}></TextInput>
            </View>
            <View>
                <Text>Frecuencia</Text>
                <TextInput onChangeText={text=>setFormDataHabitos({...FormDataHabitos,frecuencia:text})} value={FormDataHabitos.frecuencia}></TextInput>
            </View>
            <View>
                <Text>Activo</Text>
                <TextInput value={FormDataHabitos.activo}></TextInput>
            </View>
            <View>
                <Text>Fecha inicio</Text>
                <TextInput value={FormDataHabitos.fecha_inicio}></TextInput>
            </View>
            <View>
                <Pressable onPress={()=>UpdateHabitos()}>
                    <Text>Actualizar datos</Text>
                </Pressable>
            </View>
            
       </View>
       :<Text>No hay datos</Text>}
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    contenedorP:{
        margin:20,
        padding:10,
        textAlign:'left',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        boxShadow:'0px 0px 8px 1px black'
    }
})
