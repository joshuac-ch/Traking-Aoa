import axios from 'axios'
import React, { useEffect, useState } from 'react'
import constatnes from "expo-constants"
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
export default function ShowMetas() {
  const host=constatnes.expoConfig.extra.host 
  const {show}=useLocalSearchParams()
  const [dataMetas, setdataMetas] = useState([])
  
  const [userCreator, setuserCreator] = useState("")
  const [dataCreator, setdataCreator] = useState([])

  const ShowMetas=async()=>{
    const {data}=await axios.get(`http://${host}:4000/metas/s/${show}`)
    setdataMetas(data)
    setuserCreator(data.usuario_id)
    
  }
  useEffect(()=>{
    ShowMetas()
  },[])
  
  const ShowUserMetas=async()=>{
    const {data}=await axios.get(`http://${host}:4000/usuarios/s/${userCreator}`)
    setdataCreator(data)
    
  }
  useEffect(()=>{
    if(userCreator){
      ShowUserMetas()
    }
  },[userCreator])
  return (
  <>
    <View style={{flexDirection:'row',margin:10,alignItems:'center'}}>
      <View>
        <Image source={{uri:dataCreator.imagen}} style={{marginRight:10,width:100,height:100,borderRadius:40}}></Image>
      </View>
      <View>
        <Text style={{fontWeight:'bold'}}>Creador</Text>
        <Text>{dataCreator.nombre}</Text>
        <Text>{dataCreator.correo}</Text>
      </View>
    </View>
    <View>
        <View><Text>{dataMetas.titulo}</Text></View>
        <View>
            <Image style={styles.imagen} source={{uri:dataMetas.imagen}}></Image>
        </View>
    </View>    
  </>
  )
}
const styles=StyleSheet.create({
    imagen:{
        width:150,
        height:200,
        borderRadius:20,
        margin:20
    }
})
