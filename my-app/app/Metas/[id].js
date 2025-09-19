import axios from 'axios'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import constantes from 'expo-constants'
import { TextInput } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import * as ImagePicket from "expo-image-picker"
import GetImage from '../../utils/GetImage'
import { IconCalendar, IconSelectImage } from '../../assets/Icons'
import getHost from '../../hooks/getHost'
export default function DetalleMetas() {
  const {id}=useLocalSearchParams()
  const navegar=useRouter()
  const host=getHost()
  const [FormDataMetas, setFormDataMetas] = useState({
    imagen:'',
    usuario_id:'',
    titulo:'',
    descripcion:'',
    proceso:'',
    meta_total:0,
    fecha_limite:new Date()
  })
  const ShowMetas=async()=>{
    try{
        const {data}=await axios.get(`http://${host}:4000/metas/s/${id}`)
        setFormDataMetas({
            usuario_id:data.usuario_id,
            titulo:data.titulo,
            descripcion:data.descripcion,
            proceso:data.proceso,
            meta_total:data.meta_total.toString(),
            imagen:GetImage(data.imagen),            
            fecha_limite:new Date(data.fecha_limite)
        })        
    }catch(err){
        alert("Error: "+ err.message)
    }    
}
    const [loadding, setloadding] = useState(false)
    const UpdateMeta=async()=>{
        setloadding(true)
        try{
        let imageUrl=""
        if(FormDataMetas.imagen.startsWith("file://")){
            const newDataMeta=new FormData()
            newDataMeta.append("imagen",{
                uri:FormDataMetas.imagen,
                name:"update-metas.png",
                type:"image/jpeg"
            })
            const response=await axios.post(`http://${host}:4000/upload`,newDataMeta,{headers:{"Content-Type":"multipart/form-data"}})
            imageUrl=response.data.url
        }else{
            imageUrl=FormDataMetas.imagen
        }        
        await axios.put(`http://${host}:4000/metas/u/${id}`,{
                ...FormDataMetas,               
                meta_total:parseInt(FormDataMetas.meta_total),
                imagen:imageUrl
            })
            alert("Se actualizaron los datos exitosamente")
            //navegar.push("/Panel")    
            
        }catch(err){
            alert("Hubo un error al enviar los datos: ",err.response?.data?.message )
        }finally{
            setloadding(false)
        }
    }
    const SeleccionDate=()=>{
        DateTimePickerAndroid.open({
            value:FormDataMetas.fecha_limite,
            onChange:(_,SelectDate)=>{
              if(SelectDate){
                setFormDataMetas({...FormDataMetas,fecha_limite:SelectDate})
              }                      
            },
            mode:'date',
            is24Hour:true
        })
    }
    const OpenImage=async()=>{
        let result=await ImagePicket.launchImageLibraryAsync({
            mediaTypes:'images',
            allowsEditing:true,
            aspect:[4,6],
            quality:1
        })
        if(!result.canceled){
            setFormDataMetas({...FormDataMetas,imagen:result.assets[0].uri})
        }
    }
    useEffect(()=>{
        ShowMetas()
    },[])
  return (
    <>
    <Stack.Screen options={{title:`Meta N°${id}`,headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
    <ScrollView style={{backgroundColor:"#131313"}}>
        {
        <View style={{marginTop:20,marginBottom:30}}>
       {FormDataMetas!=null?
       <View className='m-4'>
            <View>
                <Text className='font-black text-lg text-white'>Imagen: </Text>
              {FormDataMetas.imagen&&
              (  <Image style={{width:200,alignSelf:'center',height:300,borderRadius:10}} source={{uri:FormDataMetas.imagen}}></Image>)
              }
              <Pressable style={{alignSelf:"center",marginTop:10,borderStyle:"solid",borderColor:"#252525",padding:5,borderRadius:10,borderWidth:2}} onPress={OpenImage}>
                <IconSelectImage color='white'></IconSelectImage>
              </Pressable>
                
            </View>
           <View>
                <Text className='font-black text-lg text-white'>Titulo: </Text>
                <TextInput style={styles.form_input}
                onChangeText={text=>setFormDataMetas({...FormDataMetas,titulo:text})} value={FormDataMetas.titulo}></TextInput>
            </View>
            <View>
                <Text className='font-black text-lg text-white'>Descripcion: </Text>
                <TextInput style={styles.form_input}
                onChangeText={text=>setFormDataMetas({...FormDataMetas,descripcion:text})} value={FormDataMetas.descripcion}></TextInput>    
            </View>
            <View>
                <Text className='font-black text-lg text-white'>Meta Total: </Text>
                <TextInput style={styles.form_input} 
                 onChangeText={text=>setFormDataMetas({...FormDataMetas,meta_total:text})} value={FormDataMetas.meta_total}></TextInput>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
               <View style={{margin:5}}>
                 <Text className='font-black text-lg text-white'>Fecha Limite: </Text>
                <Text style={{color:"white"}}>{FormDataMetas.fecha_limite.toLocaleDateString()}</Text>  
                </View>              
                <Pressable style={{padding:5}} onPress={SeleccionDate}>
                    <IconCalendar color='white'></IconCalendar>
                </Pressable>

            </View>
            <View>
                {
                    loadding?
                    <View style={styles.btn_enviar}>
                        <ActivityIndicator color={"#db515e"}></ActivityIndicator>
                    </View>
                    :
                    <Pressable style={styles.btn_enviar} onPress={()=>UpdateMeta()}>
                        <Text style={{textAlign:"center",color:"white"}}>Actualizar Meta</Text>
                    </Pressable>    
                }
            </View>  
       </View>
       :<Text style={{color:"white"}}>No hay datos disponibles</Text>}
    </View>
    }    
    </ScrollView>    
    </>
  )
}
const styles=StyleSheet.create({
    btn_enviar:{
        marginTop:20,
        backgroundColor:"#252525",
        padding:10,
        borderRadius:20,
        width:200,
        alignSelf:"center",
        
    },
    form_input:{
        color:"white",
        borderRadius:10,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'#252525',
        backgroundColor:"#252525",
        marginTop:5,
        marginBottom:5
    }
})
