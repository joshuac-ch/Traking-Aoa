import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import { useFocusEffect } from 'expo-router'
import constantes from "expo-constants"
export default function Love() {
    const [dataLove, setdataLove] = useState([])
    const host=constantes.expoConfig.extra.host
    const {user}=useUser() 
    const ShowLovePost=async()=>{
        const {data}=await axios.get(`http://${host}:4000/seguidor/loves/${user.id}`)
        setdataLove(data)
       
    }
    useFocusEffect(
        useCallback(()=>{
            if(user.id){
                ShowLovePost()
            }
        },[user.id])
    )
  return (
    <>
    <View style={{margin:10}}>
        <Text>Me encanta</Text>
        {dataLove.length>0?
        <View style={{flexDirection:'row',justifyContent:'center',flexWrap:'wrap'}}>
        {dataLove.map((p)=>{
            return(
                <View key={p.id}>
                    <View >
                        <View style={styles.contenedor_imagen}>
                        <Image style={{width:130,height:180,borderRadius:5}} source={{uri:p.valor.imagen}}></Image>
                        <Text style={{textAlign:'left'}}>{p.valor.titulo}</Text>
                        </View> 
                    </View>                                       
                </View>
            )
           })}
        </View>
        :
        <Text>No hay PostLoves</Text>}
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    contenedor_imagen:{
        height:200,
        width:130,
        margin:0,
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:5
    }
})
