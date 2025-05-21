import axios from 'axios'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import constantes from 'expo-constants'
import { TextInput } from 'react-native'
export default function DetalleMetas() {
  const {id}=useLocalSearchParams()
  const navegar=useRouter()
  const host=constantes.expoConfig.extra.host
  const [FormDataMetas, setFormDataMetas] = useState({
    usuario_id:'',
    titulo:'',
    descripcion:'',
    proceso:'',
    meta_total:0,
    fecha_limite:''
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
            fecha_limite:data.fecha_limite
        })        
    }catch(err){
        alert("Error: "+ err.message)
    }    
}
    const UpdateMeta=async()=>{
        try{
            await axios.put(`http://${host}:4000/metas/u/${id}`,{
                ...FormDataMetas,               
                meta_total:parseInt(FormDataMetas.meta_total)
            })
            alert("Se actualizaron los datos exitosamente")
            //navegar.push("/Panel")    
        }catch(err){
            alert("Hubo un error al enviar los datos: ",err.response?.data?.message )
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
       <View>
            <View>
                <Text>Meta N°{id}</Text>
            </View>
           <View>
                <Text>Titulo: </Text>
                <TextInput onChangeText={text=>setFormDataMetas({...FormDataMetas,titulo:text})} value={FormDataMetas.titulo}></TextInput>
            </View>
            <View>
                <Text>Descripcion: </Text>
                <TextInput onChangeText={text=>setFormDataMetas({...FormDataMetas,descripcion:text})} value={FormDataMetas.descripcion}></TextInput>    
            </View>
            <View>
                <Text>Meta Total: </Text>
                <TextInput onChangeText={text=>setFormDataMetas({...FormDataMetas,meta_total:text})} value={FormDataMetas.meta_total}></TextInput>
            </View>
            <View>
                <Text>Fecha Limite: </Text>
                <TextInput onChangeText={text=>setFormDataMetas({...FormDataMetas,fecha_limite:text})} value={FormDataMetas.fecha_limite}></TextInput>
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
