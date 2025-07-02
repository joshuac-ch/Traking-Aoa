import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import { Link, useFocusEffect } from 'expo-router'
import constantes from "expo-constants"
import { Pressable } from 'react-native'
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
        
        {dataLove.length>0?
        <View style={{flexDirection:'row',justifyContent:'center',flexWrap:'wrap'}}>
        {dataLove.map((p)=>{
            return(                
                    <Link key={p.id} asChild href={`/${p.tipo}/show/${p.valor.id}`}>
                    <Pressable key={p.id}>                   
                    <View >
                        <View style={styles.contenedor_imagen}>
                        <Image style={{width:117,height:180,borderRadius:5,alignSelf:'center'}} source={{uri:p.valor.imagen}}></Image>
                        <Text style={{textAlign:'left'}}>{p.valor.titulo}</Text>
                        </View> 
                    </View>
                    </Pressable>                                       
                
                    </Link>
             
            )
           })}
        </View>
        :
        <Text style={{textAlign:'center'}}>No hay PostLoves</Text>}
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    contenedor_imagen:{
        height:200,
        width:120,
        marginLeft:2,
        marginRight:2,
        marginTop:10,
        marginBottom:5,
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:5,
        borderColor:"red",
        borderWidth:2,
        borderStyle:"solid"
    }
})
