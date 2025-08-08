import axios from 'axios'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import constantes from 'expo-constants'
import { TextInput } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import * as ImagePicket from "expo-image-picker"
export default function DetalleMetas() {
  const {id}=useLocalSearchParams()
  const navegar=useRouter()
  const host=constantes.expoConfig.extra.host
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
            imagen:data.imagen,
            fecha_limite:new Date(data.fecha_limite)
        })        
    }catch(err){
        alert("Error: "+ err.message)
    }    
}
    const UpdateMeta=async()=>{
        let imageUrl=""
        if(FormDataMetas.imagen.startsWith("file://")){
            const newDataMeta=new FormData()
            newDataMeta.append("imagen",{
                uri:FormDataMetas.imagen,
                name:"update-metas",
                type:"image/jpeg"
            })
            const response=await axios.post(`http://${host}:4000/upload`,newDataMeta,{headers:{"Content-Type":"multipart/form-data"}})
            imageUrl=response.data.url
        }else{
            imageUrl=FormDataMetas.imagen
        }
        try{
            await axios.put(`http://${host}:4000/metas/u/${id}`,{
                ...FormDataMetas,               
                meta_total:parseInt(FormDataMetas.meta_total),
                imagen:imageUrl
            })
            alert("Se actualizaron los datos exitosamente")
            //navegar.push("/Panel")    
        }catch(err){
            alert("Hubo un error al enviar los datos: ",err.response?.data?.message )
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
    <Stack.Screen options={{title:`Meta N°${id}`}}></Stack.Screen>
    <View>
       {FormDataMetas!=null?
       <View className='m-4'>
            <View>
                <Text className='font-black text-lg'>Imagen: </Text>
              {FormDataMetas.imagen&&
              (  <Image style={{width:200,alignSelf:'center',height:300,borderRadius:10}} source={{uri:FormDataMetas.imagen}}></Image>)
              }
                <Button onPress={OpenImage} title='seleccionar imagen'></Button>
            </View>
           <View>
                <Text className='font-black text-lg'>Titulo: </Text>
                <TextInput style={styles.form_input}
                onChangeText={text=>setFormDataMetas({...FormDataMetas,titulo:text})} value={FormDataMetas.titulo}></TextInput>
            </View>
            <View>
                <Text className='font-black text-lg'>Descripcion: </Text>
                <TextInput style={styles.form_input}
                onChangeText={text=>setFormDataMetas({...FormDataMetas,descripcion:text})} value={FormDataMetas.descripcion}></TextInput>    
            </View>
            <View>
                <Text className='font-black text-lg'>Meta Total: </Text>
                <TextInput style={styles.form_input} 
                 onChangeText={text=>setFormDataMetas({...FormDataMetas,meta_total:text})} value={FormDataMetas.meta_total}></TextInput>
            </View>
            <View>
                <Text className='font-black text-lg'>Fecha Limite: </Text>
                <Text>{FormDataMetas.fecha_limite.toLocaleDateString()}</Text>
                <Button onPress={SeleccionDate} title="Cambiar fecha" />
                

            </View>
            <View>
                <Pressable onPress={()=>UpdateMeta()}>
                    <Text>Actualizar Meta</Text>
                </Pressable>    
            </View>  
       </View>
       :<Text>No hay datos disponibles</Text>}
    </View>    
    </>
  )
}
const styles=StyleSheet.create({
    form_input:{
        borderRadius:10,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        marginTop:5,
        marginBottom:5
    }
})
