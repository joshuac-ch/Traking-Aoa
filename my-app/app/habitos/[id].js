import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { View,Text, TextInput, Image, StyleSheet, Pressable, Switch, Button, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native'
import constantes from "expo-constants"
import axios from 'axios'
import { IconCloseImage, IconFrecuencia, IconSelectImage, IconShow, IconText, IconTitle } from '../../assets/Icons'
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { useUser } from '../../components/UserContext'
import GetImage from '../../utils/GetImage'
import { Modal } from 'react-native'
import PubicacionPrev from '../../components/PubicacionPrev'
import getHost from '../../hooks/getHost'

export default function DetalleHabito() {
  const {id}=useLocalSearchParams()
  const navegar=useRouter()
  const host=getHost()
  const [FormDataHabitos, setFormDataHabitos] = useState({
    titulo:'',
    descripcion:'',
    frecuencia:'',
    activo:0,
    fecha_inicio:'',
    usuario_id:'',
    imagen:''
  })
  const [creador, setcreador] = useState([])
  const FectCreador=async()=>{
    const {data}=await axios.get(`http:/${host}:4000/usuarios/s/${user.id}`)
    setcreador(data)
}
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
            imagen:GetImage(data.imagen)
        })
    }catch(err){
        alert(err.message)
    }
  }
  const [loadding, setloadding] = useState(false)
  const UpdateHabitos=async()=>{
    try{
        setloadding(true)
        let ImageUrl=""
        if(FormDataHabitos.imagen.startsWith("file://")){
            const newDataPerfil=new FormData()
            newDataPerfil.append("imagen",{
                uri:FormDataHabitos.imagen,
                name:"update-habitos.jpg",
                type:"image/jpeg"
            })
        
        const response=await axios.post(`http://${host}:4000/upload`,newDataPerfil,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        ImageUrl=response.data.url
        }else{
            ImageUrl=FormDataHabitos.imagen
        }
        await axios.put(`http://${host}:4000/habitos/u/${id}`,{...FormDataHabitos,imagen:ImageUrl})
        alert("se realizo el registro")        
        //ToastAndroid.show("Se actualizaron los datos",ToastAndroid.SHORT)
        //navegar.push("/Panel")
    }catch(err){
        alert(err.message)
    }finally{
        setloadding(false)
    }
  }
  useEffect(()=>{
    if(id){
    FectHabitos()
    FectCreador()
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
        alert("Se publico el habito")
        
  } 
  const DeletePublicacion=async()=>{
    try{
        await axios.delete(`http://${host}:4000/publicaciones/r/d/${id}/Habitos`)
        alert("Se elimino la publicacion")
    }catch(err){
        alert("Ya elimino esta publicacion")
    }
  } 
  const [estadoPub, setestadoPub] = useState("borrador")
  const GetEstado=async()=>{    
        const {data}=await axios.get(`http://${host}:4000/publicacion/estado/${id}`)
        if(data){
            setestadoPub("Subido")
        }
    
  }   
  useFocusEffect(
    useCallback(()=>{
        if(id){
            GetEstado()
        }
    },[id])
  )
  const [estadoimg, setestadoimg] = useState(false)
  const ShowImage=()=>{
    setestadoimg(true)
  }
    return (
    <>
    <Stack.Screen options={{title:`Habito N°${id}`,headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
    <ScrollView style={{backgroundColor:"#131313"}}>
    <View>
       {FormDataHabitos!=null?
       <View style={styles.contenedorP}>
        <View>
            <Text style={{color:"white"}}>Estado: {estadoPub}</Text>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10,paddingBottom:10}}>
            <Pressable onPress={DeletePublicacion}  style={{backgroundColor:"#db515e",borderRadius:10,boxShadow:"0px 0px 7px 1px red",padding:10}}>
                <View>
                    <Text style={{color:"white"}}>Eliminar Publicacion</Text>
                </View>
            </Pressable>
            <Pressable onPress={Publicacion} style={{borderRadius:10,padding:10,backgroundColor:"#131313",boxShadow:"0px 0px 7px 1px white"}}>
                <View>
                    <Text style={{color:"white"}}>Publicar</Text>
                </View>
            </Pressable>
        </View>
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                {FormDataHabitos.imagen&&(
                     <Image source={{uri:FormDataHabitos.imagen}} style={{width:200,height:300,borderRadius:20}}></Image>
                )}
               <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10}}>
                 <Pressable style={{borderRadius:10,borderWidth:2,borderColor:"#4b4b4b",borderStyle:"solid",padding:8,marginRight:2}} onPress={pickImage}>
                    <View >
                        <IconSelectImage color='white'></IconSelectImage>                        
                    </View>
                </Pressable>
                <Pressable onPress={ShowImage} style={{borderWidth:2,borderColor:"#4b4b4b",borderStyle:"solid",padding:8,borderRadius:10}}>
                    <View>
                        <IconShow color='white'></IconShow>
                    </View>
                </Pressable>
               </View>
               <Modal visible={estadoimg} animationType='fade' transparent={true}>
                <View style={{backgroundColor:"#131313",position:"absolute",borderWidth:2,borderColor:"black",top:60,left:10,borderRadius:20,height:`${93}%`,width:`${95}%`,}}>
                    <View style={{alignSelf:"flex-end",marginTop:10,marginRight:10}}>
                        <Pressable onPress={()=>setestadoimg(false)}>
                            <IconCloseImage color='white'></IconCloseImage>
                        </Pressable>
                    </View>
                    <View>
                        <PubicacionPrev datosUser={creador} datasRutina={FormDataHabitos}></PubicacionPrev>
                    </View>
                </View>
               </Modal>
            </View>
            <View>
            </View>
            <View style={styles.cotenedor_des}>
                <View style={styles.contenedortitulo}>
                    <IconTitle color='#4b4b4b'></IconTitle>
                    <Text style={{color:"white"}}>Titulo: </Text>
                </View>
                <TextInput style={styles.input_form} onChangeText={text=>setFormDataHabitos({...FormDataHabitos,titulo:text})}  value={FormDataHabitos.titulo}></TextInput>
            </View>
            <View style={styles.cotenedor_des}>
                <View style={styles.contenedortitulo}>
                    <IconText color='#4b4b4b'></IconText>
                    <Text style={{color:"white"}}>Descripcion: </Text>
                </View>                
                <TextInput style={styles.input_form_des} onChangeText={text=>setFormDataHabitos({...FormDataHabitos,descripcion:text})} value={FormDataHabitos.descripcion}></TextInput>
            </View>
            <View style={styles.contenedorForm}>
                <View style={styles.contenedortitulo}>
                    <IconFrecuencia color='#4b4b4b'></IconFrecuencia>
                    <Text style={{color:"white"}}>Frecuencia: </Text>                  
                </View>                 
                      <Picker style={{width:100,color:"white"}} selectedValue={FormDataHabitos.frecuencia} onValueChange={value=>setFormDataHabitos({...FormDataHabitos,frecuencia:value})}>
                             <Picker.Item label='diario' value="diario"></Picker.Item>
                             <Picker.Item label='semanal' value='semanal'></Picker.Item>
                             <Picker.Item label='mensual' value='mensual'></Picker.Item>
                       </Picker>   
                                  
            </View>
            <View style={styles.contenedorForm}>
                <Text style={{color:"white"}}>Activo</Text>
                <Switch value={FormDataHabitos.activo} onValueChange={value=>setFormDataHabitos({ ...FormDataHabitos,activo:value})}></Switch>
            </View>
            <View style={styles.contenedorForm}> 
                <Text style={{color:"white"}}>Fecha inicio</Text>
                <Text style={{color:"white"}}>{FormDataHabitos.fecha_inicio?new Date(FormDataHabitos.fecha_inicio).toLocaleDateString():""} </Text>
            </View>
            <View >
                {loadding?
                <View style={styles.btn_update}>
                    <ActivityIndicator color={"#db515e"}></ActivityIndicator>
                </View>
                :
                <Pressable style={styles.btn_update} onPress={()=>UpdateHabitos()}>
                    <Text style={{textAlign:"center",color:"white"}}>Actualizar datos</Text>
                </Pressable>
                }
                
            </View>
            
       </View>
       :<Text style={{color:"white"}}>No hay datos</Text>}
    </View>
    </ScrollView>
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
        borderColor:'#4b4b4b',
        padding:10,
        margin:5,
        borderRadius:20,
    },
    contenedorP:{
        backgroundColor:"#252525",
        margin:20,        
        textAlign:'left',
        padding:20,
        borderRadius:20,
        boxShadow:'0px 0px 8px 1px black'
    },
    cotenedor_des:{
        marginTop:10,
        display:'flex',
        
        alignItems:'flex-start',
    },
    contenedorForm:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
       
        alignItems:'center'
    },
   
    contenedortitulo:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        
    }
})
