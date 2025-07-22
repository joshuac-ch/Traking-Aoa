import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View,Text, TextInput, Image, StyleSheet, Pressable, Switch, Button, ToastAndroid } from 'react-native'
import constantes from "expo-constants"
import axios from 'axios'
import { IconFrecuencia, IconText, IconTitle } from '../../assets/Icons'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { useUser } from '../../components/UserContext'

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
    usuario_id:'',
    imagen:''
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
            usuario_id:data.usuario_id,
            imagen:data.imagen
        })
    }catch(err){
        alert(err.message)
    }
  }
  const UpdateHabitos=async()=>{
    try{
        await axios.put(`http://${host}:4000/habitos/u/${id}`,FormDataHabitos)
        ToastAndroid.show("Se actualizaron los datos",ToastAndroid.SHORT)
        navegar.push("/Panel")
    }catch(err){
        alert(err.message)
    }
  }
  useEffect(()=>{
    if(id){
    FectHabitos()
    }
  },[id])
  const pickImage=async()=>{
    let result=await ImagePicker.launchImageLibraryAsync({
        mediaTypes:['images','videos'],
        allowsEditing:true,
        aspect:[4,6],
        quality:1
    })
    if(!result.canceled){
        setFormDataHabitos({...FormDataHabitos,imagen:result.assets[0].uri})
    }
     
  } 
  const {user}=useUser()
      const Publicacion=async()=>{
    await axios.post(`http://${host}:4000/publicacion/habitos/${id}/${user.id}`)
    alert("Se creo el habito")
  }     
    return (
    <>
    <Stack.Screen options={{title:`Habito N°${id}`}}></Stack.Screen>
    <View>
       {FormDataHabitos!=null?
       <View style={styles.contenedorP}>
         <Pressable onPress={Publicacion}  style={{position:"absolute",zIndex:1,top:0,alignSelf:'flex-end',borderRadius:10,padding:10,backgroundColor:"purple",boxShadow:"0px 0px 7px 1px purple"}}>
                        <View>
                            <Text style={{color:"white"}}>Publicar</Text>
                        </View>
                    </Pressable>
            <View>
                {FormDataHabitos.imagen&&(
                     <Image source={{uri:FormDataHabitos.imagen}} style={{width:200,height:300,borderRadius:20}}></Image>
                )}
                
                <Button onPress={pickImage} title='Seleccionar imagen'></Button>
            </View>
            <View>
            </View>
            <View style={styles.cotenedor_des}>
                <View style={styles.contenedortitulo}>
                    <IconTitle></IconTitle>
                    <Text>Titulo: </Text>
                </View>
                <TextInput style={styles.input_form} onChangeText={text=>setFormDataHabitos({...FormDataHabitos,titulo:text})}  value={FormDataHabitos.titulo}></TextInput>
            </View>
            <View style={styles.cotenedor_des}>
                <View style={styles.contenedortitulo}>
                    <IconText></IconText>
                    <Text>Descripcion: </Text>
                </View>                
                <TextInput style={styles.input_form_des} onChangeText={text=>setFormDataHabitos({...FormDataHabitos,descripcion:text})} value={FormDataHabitos.descripcion}></TextInput>
            </View>
            <View style={styles.contenedorForm}>
                <View style={styles.contenedortitulo}>
                    <IconFrecuencia></IconFrecuencia>
                    <Text>Frecuencia: </Text>                  
                </View>                 
                      <Picker style={{width:100}} selectedValue={FormDataHabitos.frecuencia} onValueChange={value=>setFormDataHabitos({...FormDataHabitos,frecuencia:value})}>
                             <Picker.Item label='diario' value="diario"></Picker.Item>
                             <Picker.Item label='semanal' value='semanal'></Picker.Item>
                             <Picker.Item label='mensual' value='mensual'></Picker.Item>
                       </Picker>   
                                  
            </View>
            <View style={styles.contenedorForm}>
                <Text>Activo</Text>
                <Switch value={FormDataHabitos.activo} onValueChange={value=>setFormDataHabitos({ ...FormDataHabitos,activo:value})}></Switch>
            </View>
            <View style={styles.contenedorForm}> 
                <Text>Fecha inicio</Text>
                <Text>{FormDataHabitos.fecha_inicio?new Date(FormDataHabitos.fecha_inicio).toLocaleDateString():""} </Text>
            </View>
            <View >
                <Pressable style={styles.btn_update} onPress={()=>UpdateHabitos()}>
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
    button:{
        borderRadius:10,
        borderWidth:2,
        borderColor:"black",
        borderStyle:'solid',
        margin:20,
        padding:10
    },
    input_form:{
        width:"100%", 
        borderWidth:2,
        backgroundColor:'white',
        borderStyle:'solid',
        borderColor:"black",
        borderRadius:10,
        marginTop:10,
       
    },
    input_form_des:{
        width:"100%",
        height:80,
        textAlignVertical:'top',
        borderWidth:2,
        backgroundColor:'white',
        borderStyle:'solid',
        borderColor:"black",
        borderRadius:10,
        marginTop:10,
       
    },
    btn_update:{
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        padding:10,
        margin:5,
        borderRadius:20,
    },
    contenedorP:{
        margin:20,        
        textAlign:'left',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        boxShadow:'0px 0px 8px 1px black'
    },
    cotenedor_des:{
        marginTop:10,
        display:'flex',
        width:'70%',
        alignItems:'flex-start',
    },
    contenedorForm:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
       width:'70%',
        alignItems:'center'
    },
   
    contenedortitulo:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        
    }
})
