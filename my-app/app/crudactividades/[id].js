import axios from 'axios'
import { useLocalSearchParams} from 'expo-router/build/hooks'
import React, { useEffect, useState } from 'react'
import { View,Text, StyleSheet, Image,TextInput, Pressable  } from 'react-native'
import Constantes from "expo-constants"
import { useUser } from '../../components/UserContext'
import { useRouter } from 'expo-router'
export default function DetalleActividad() {
  const {id}=useLocalSearchParams()
  const navegar=useRouter()
  const local=Constantes.expoConfig.extra.host
  const [detalleactividad, setdetalleactividad] = useState([])
  const [Formdata, setFordata] = useState({
    titulo:'',
    descripcion:'',
    usuario_id:'',
    fecha:''

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
                fecha:data.fecha
            })
        }catch(err){
            alert("Hubo un error: "+err.message)
        }
    }
    const UpdateActividad=async()=>{
        try{
            await axios.put(`http://${local}:4000/actividades/u/${id}`,Formdata)
            alert("Se actualizaron los datos")
            navegar.push("/Panel")
        }catch(err){
            alert(err.message)
        }
    }
    useEffect(()=>{
        FetchActividadesShow()
    },[])
    return (
    <View>
        {detalleactividad!=null?
        <View style={styles.contenedor}>         
           <View>
             <View className='p-4'>
                <Image source={{uri:"https://i.pinimg.com/736x/92/87/4d/92874dce421618af3269039f374dbed3.jpg"}} style={{width:200,height:250,borderRadius:20}}></Image>
            </View>
            <View className=''>
                <Text className='font-black'>Titutlo: </Text>
                <TextInput value={Formdata.titulo} onChangeText={text=>setFordata({...Formdata,titulo:text})}></TextInput>
                
            </View >
            <View >
                <Text  className='font-black'>Desripcion:</Text>
                <TextInput value={Formdata.descripcion} onChangeText={text=>setFordata({...Formdata,descripcion:text})}></TextInput>
            </View>
            <View className=''>
                <Text  className='font-black'>Fecha Creada: </Text>
                <Text>{Formdata.fecha}</Text>
            
          </View>
          <View>
            <Pressable onPress={()=>UpdateActividad()}>
                <Text>Actualizar Datos</Text>
            </Pressable>
          </View>
           </View>
        </View>
        :<Text>No hay datos</Text>}
    </View>
  )
}
const styles=StyleSheet.create({
    contenedor:{
        margin:10,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',       
        alignItems:'center',
        borderRadius:20,
        padding:20,
        boxShadow:'0px 0px 8px 1px black'
    }
})
