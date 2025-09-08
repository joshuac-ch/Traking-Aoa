import axios from 'axios'
import { useLocalSearchParams} from 'expo-router/build/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { View,Text, StyleSheet, Image,TextInput, Pressable, Button, ScrollView, ActivityIndicator, Modal  } from 'react-native'
import Constantes from "expo-constants"
import { useUser } from '../../components/UserContext'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import {IconCloseImage, IconDelete, IconSelectImage, IconShow } from '../../assets/Icons'
import GetImage from '../../utils/GetImage'
import PublicacionComponent from '../../components/PublicacionComponent'
import PubicacionPrev from '../../components/PubicacionPrev'
import getHost from '../../hooks/getHost'
export default function DetalleActividad() {
  const {id}=useLocalSearchParams()
  const navegar=useRouter()
  const {user}=useUser()
  const local=getHost()
  const [detalleactividad, setdetalleactividad] = useState([])
  const [Formdata, setFordata] = useState({
    titulo:'',
    descripcion:'',
    usuario_id:'',
    fecha:'',
    imagen:''

  })  
  //Traer Actividades
    const FetchActividadesShow=async()=>{
        try{
            const {data}=await axios.get(`http://${local}:4000/actividades/s/${id}`)
            setdetalleactividad(data)
            setFordata({
                titulo:data.titulo,
                descripcion:data.descripcion,
                usuario_id:data.usuario_id,
                fecha:data.fecha,
                imagen:GetImage(data.imagen),
            })
        }catch(err){
            alert("Hubo un error: "+err.message)
        }
    }
    const [loadding, setloadding] = useState(false)
    const UpdateActividad=async()=>{
        setloadding(true)
        try{
            
            let imagenURL=""
            if(Formdata.imagen.startsWith("file://")){
                const newData=new FormData()
                newData.append("imagen",{
                    uri:Formdata.imagen,
                    name:"update-actividad.jpg",
                    type:"image/jpeg"
                })
            
            const response=await axios.post(`http://${local}:4000/upload`,newData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            imagenURL=response.data.url
        }else{
            imagenURL=Formdata.imagen
        }
    
            await axios.put(`http://${local}:4000/actividades/u/${id}`,{...Formdata,imagen:imagenURL})
            alert("Se actualizaron los datos")
            //setloadding(false)
            //navegar.push("/Panel")
        }catch(err){
            alert(err.message)
            //setloadding(false)
        }finally{
            setloadding(false)
        }
    }
    useEffect(()=>{
       if(id){
        FetchActividadesShow()
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
           setFordata({...Formdata,imagen:result.assets[0].uri})
       }}
       
    const publicar=async()=>{
        await axios.post(`http://${local}:4000/publicacion/actividad/${id}/${user.id}`)
        alert("Se realizo la publicacion") 
    }
    const DeletePublicacion=async()=>{
        try{
            await axios.delete(`http://${local}:4000/publicaciones/r/d/${id}/Actividades`)
            alert("Se elimino la publicacion")
        }catch(err){
            alert("Ya elimino esta publicacion")
        }
    }
    
    const [valorPubID, setvalorPubID] = useState("borrador")
    const Estado=async()=>{        
        const {data}=await axios.get(`http://${local}:4000/publicacion/estado/${id}`)
        if(data){                       
            setvalorPubID("Subido")
        }     
           
    }
     const [dataCreador, setdataCreador] = useState()
    const GetCreador=async()=>{
        const {data}=await axios.get(`http://${local}:4000/usuarios/s/${user.id}`)
        setdataCreador(data)             
    }
    
    useFocusEffect(
        useCallback(()=>{
            if(id){
                Estado()
                GetCreador()
                 
            }
        },[id])
    )
    const [mostrarImagen, setmostrarImagen] = useState(false)
    const ShowImage=()=>{
        setmostrarImagen(true)
    }   
    
    return (
   <>
   <Stack.Screen options={{title:`Actividad N°${id}`}}></Stack.Screen>
    <ScrollView>
        
        <View>        
        {detalleactividad!=null?
        <View style={styles.contenedor}>
            <View>
                <Text>Estado: {valorPubID}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",paddingTop:10}}>
                <Pressable onPress={DeletePublicacion} style={{backgroundColor:"red",borderRadius:10,boxShadow:"0px 0px 7px 1px red",padding:10}}>
                <View>
                    <Text style={{color:"white"}}>Eliminar Publicacion</Text>
                </View>
                </Pressable>
                <Pressable onPress={publicar} style={{alignSelf:'flex-end',borderRadius:10,padding:10,backgroundColor:"purple",boxShadow:"0px 0px 7px 1px purple"}}>
                    <View>
                        <Text style={{color:"white"}}>Publicar</Text>
                    </View>
                </Pressable>
            </View>

           <View>
             <View  style={styles.contenedor_img} className='p-4'>
                {Formdata.imagen&&(
                    <Image source={{uri:Formdata.imagen}} style={{width:200,height:250,borderRadius:20}}></Image>
                )}
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10}}>
                    <Pressable onPress={pickImage} >
                    <View style={styles.button}>
                        <IconSelectImage></IconSelectImage>
                    </View>
                    </Pressable>
                    <Pressable onPress={ShowImage} style={{borderWidth:2,borderColor:"black",borderStyle:"solid",padding:8,borderRadius:10}}>
                        <View >
                            <IconShow></IconShow>
                        </View>
                    </Pressable>
                </View>
                <Modal visible={mostrarImagen} transparent={true} animationType='fade'>
                    <View style={{backgroundColor:"white",position:"absolute",borderWidth:2,borderColor:"black",top:60,left:10,height:`${92}%`,width:`${95}%`,borderRadius:20}}>
                        <View style={{alignSelf:"flex-end",marginTop:10,marginRight:10}}>
                            <Pressable onPress={()=>setmostrarImagen(false)}>
                                <IconCloseImage></IconCloseImage> 
                            </Pressable>                       
                        </View>
                        <View>
                            {/*No usar este crear otro sin el get ImAGE, PARA PREVISUALIZAR */}
                            <PubicacionPrev datosUser={dataCreador} datasRutina={Formdata}></PubicacionPrev>
                            
                        </View>

                    </View>
                </Modal>
            </View>
            <View className=''>
                <Text className='font-black'>Titutlo: </Text>
                <TextInput style={styles.input_form} value={Formdata.titulo} onChangeText={text=>setFordata({...Formdata,titulo:text})}></TextInput>
                
            </View >
            <View >
                <Text  className='font-black'>Desripcion:</Text>
                <TextInput style={styles.des_input_form} value={Formdata.descripcion} onChangeText={text=>setFordata({...Formdata,descripcion:text})}></TextInput>
            </View>
            <View className=''>
                <Text  className='font-black'>Fecha Emitida: </Text>
                <Text>{Formdata.fecha?new Date(Formdata.fecha).toLocaleDateString():""}</Text>
            
          </View>
          <View style={{alignItems:'center'}}>
            {loadding?
            <View style={styles.btn_update}>
                <ActivityIndicator color={"purple"}></ActivityIndicator>
            </View>
            :
            <Pressable style={styles.btn_update} onPress={()=>UpdateActividad()}>
                <Text style={{textAlign:'center'}}>Actualizar Datos</Text>
            </Pressable>
            }
          </View>
          
               
           </View>
        </View>
        :<Text>No hay datos</Text>}
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
        marginRight:2,
        padding:8
    },
    input_form:{
        borderWidth:2,
        backgroundColor:'white',
        borderStyle:'solid',
        borderColor:"black",
        borderRadius:10,
        marginTop:10,
        marginBottom:10,
    },
    des_input_form:{
        borderColor:"black",
        borderStyle:'solid',
        borderWidth:2,
        textAlignVertical:"top",
        flexWrap:'wrap',
        backgroundColor:"white",
        borderRadius:10,
        marginTop:10,
        marginBottom:10,
        height:100
    },
    contenedor:{
        margin:10,
        
        borderRadius:20,
        padding:20,
        boxShadow:'0px 0px 8px 1px black'
    },
    contenedor_img:{
        
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',       
        alignItems:'center',       
    },
    btn_update:{
        margin:15,
        borderRadius:10,
        borderWidth:2,
        borderColor:'black',
        borderStyle:'solid',
        width:150,
        padding:10,

        }

})
