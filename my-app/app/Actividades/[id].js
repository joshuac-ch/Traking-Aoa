import axios from 'axios'
import { useLocalSearchParams} from 'expo-router/build/hooks'
import React, { useEffect, useState } from 'react'
import { View,Text, StyleSheet, Image,TextInput, Pressable, Button  } from 'react-native'
import Constantes from "expo-constants"
import { useUser } from '../../components/UserContext'
import { Stack, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
export default function DetalleActividad() {
  const {id}=useLocalSearchParams()
  const navegar=useRouter()
  const {user}=useUser()
  const local=Constantes.expoConfig.extra.host
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
                imagen:data.imagen,
            })
        }catch(err){
            alert("Hubo un error: "+err.message)
        }
    }
    const UpdateActividad=async()=>{
        try{
            await axios.put(`http://${local}:4000/actividades/u/${id}`,Formdata)
            alert("Se actualizaron los datos")
            //navegar.push("/Panel")
        }catch(err){
            alert(err.message)
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
           aspect:[4,3],
           quality:1
       })
       if(!result.canceled){
           setFordata({...Formdata,imagen:result.assets[0].uri})
       }}
    const publicar=async()=>{
        await axios.post(`http://${local}:4000/publicacion/actividad/${id}/${user.id}`)
        alert("Se realizo la publicacion") 
    }
    return (
   <>
   <Stack.Screen options={{title:`Actividad N°${id}`}}></Stack.Screen>
    <View>        
        {detalleactividad!=null?
        <View style={styles.contenedor}>
            <Pressable onPress={publicar} style={{alignSelf:'flex-end',borderRadius:10,padding:10,backgroundColor:"purple",boxShadow:"0px 0px 7px 1px purple"}}>
                <View>
                    <Text style={{color:"white"}}>Publicar</Text>
                </View>
            </Pressable>

           <View>
             <View  style={styles.contenedor_img} className='p-4'>
                {Formdata.imagen&&(
                    <Image source={{uri:Formdata.imagen}} style={{width:200,height:250,borderRadius:20}}></Image>
                )}
                <Pressable onPress={pickImage} >
                    <View style={styles.button}>
                        <Text>Seleccionar Imagen</Text>
                    </View>
                </Pressable>
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
            <Pressable style={styles.btn_update} onPress={()=>UpdateActividad()}>
                <Text style={{textAlign:'center'}}>Actualizar Datos</Text>
            </Pressable>
          </View>
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
