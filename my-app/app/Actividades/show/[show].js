import axios from 'axios'
import React, { useEffect, useState } from 'react'
import constantes from "expo-constants"
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IconElipsis, IconHeart, IconReply } from '../../../assets/Icons'
export default function ShowActividadUser() {
    const host=constantes.expoConfig.extra.host
    const [creatorUser, setcreatorUser] = useState("")
    const [dataCreator, setdataCreator] = useState([])
    const {show}=useLocalSearchParams()
    const [dataActividaes, setdataActividaes] = useState([]) 
    const showActividades=async()=>{
        const {data}=await axios.get(`http://${host}:4000/actividades/s/${show}`)
        setdataActividaes(data)
        setcreatorUser(data.usuario_id)
    }
    
    const ShowUserCreator=async()=>{
        const {data}=await axios.get(`http://${host}:4000/usuarios/s/${creatorUser}`)
        setdataCreator(data)
    }

    useEffect(()=>{
        showActividades()
    },[])
    useEffect(()=>{
        if(creatorUser){
            ShowUserCreator()
        }
    },[creatorUser])
    return (
    <>
    <View style={styles.contenedor_pub}>
    
    
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
         <View style={{flexDirection:'row'}}>
        <View>
            {dataCreator.imagen&&(
                <Image source={{uri:dataCreator.imagen}} style={{width:60,height:60,borderRadius:30,marginRight:10}}></Image>
            )}
        </View>
        <View>
            <Text style={{fontWeight:'bold'}}>Creador</Text>
            <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:10}}>{dataCreator.nombre}</Text>
                <Text style={{color:'#75706f'}}>{dataActividaes.fecha?new Date(dataActividaes.fecha).toLocaleDateString():""}</Text>
            </View>
            <Text>{dataCreator.correo}</Text>
        </View>
        
        </View>
            <View >
            <IconElipsis></IconElipsis>
            </View>
       </View>
    <View  style={{padding:10}}>
        <Text>{dataActividaes.titulo}</Text>
        <Text>{dataActividaes.descripcion}</Text>
    </View>
    <View>
        {dataActividaes.imagen&&(
            <Image style={styles.imagen} source={{uri:dataActividaes.imagen}}></Image>
        )}
    </View>
    <View style={styles.likes}>
        <View style={styles.box}>
            <IconHeart></IconHeart>
            <Text style={{marginLeft:10}}>Love</Text>
        </View>
        <View style={styles.box}>
            <IconReply></IconReply>
            <Text style={{marginLeft:10}}>Compartir</Text>
        </View>
    </View>
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    box:{
        flexDirection:'row',
        alignItems:'center',
        margin:10
    },
    likes:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    contenedor_pub:{
        margin:20,
        
        backgroundColor:'white',
        borderWidth:2,
        borderColor:'transparent',
        borderStyle:'solid',
        borderRadius:10
    },
    
    imagen:{
        alignSelf:'center',
        margin:10,
        width:150,
        height:200,
        
        borderRadius:20
    }
})
