import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Habitos from '../../hooks/Habitos'
import { IconAdd, IconDate, IconDelete } from '../../assets/Icons'
import { Link, Stack } from 'expo-router'
import axios from 'axios'
import contantes from "expo-constants"
export default function index() {
  const {FecthHabitos,habitos}=Habitos()
  useEffect(()=>{
    FecthHabitos()
  },[])
  const EliminarHabito=async(id)=>{
    try{
      const host=contantes.expoConfig.extra.host
      await axios.delete(`http://${host}:4000/habitos/d/${id}`)
      alert("Se elimino el habito")
      FecthHabitos()
    }catch(err){
      alert("Hubo un error"+err.message)
    }
  }  
  return (
    <ScrollView>
      <Stack.Screen options={{title:'Habitos'}}></Stack.Screen>
      <View>
       <View style={styles.contenedorHeader}>
            <Text className='font-black'>Habitos</Text>
            <Link href={'/habitos/create/'} asChild>
                <Pressable>  
                  <IconAdd />  
                </Pressable>
            </Link>
       </View>
       {habitos!=null?
       <View>
        {habitos.map((h)=>{
            return(
                <Link key={h.id} href={`/habitos/${h.id}`} asChild>
                  <Pressable>
                      <View style={styles.contenedor} key={h.id}>
                        <View>
                            <View>
                                <Text>Titulo:</Text>
                                <Text>{h.titulo}</Text>
                                <Text>Frecuencia: {h.frecuencia}</Text>   
                            </View>
                            <Text >{h.descripcion}</Text>
                          
                        </View>
                        <View>
                          <View >
                            <View style={{alignItems:'flex-end'}}>
                              
                            <Pressable onPress={()=>EliminarHabito(h.id)}>
                              <IconDelete></IconDelete>
                            </Pressable>
                            </View>
                            <View style={styles.contenedor_date}>
                              <IconDate></IconDate>
                               <Text>{h.fecha_inicio?new Date(h.fecha_inicio).toLocaleDateString():''}</Text>
                            </View>
                           
                          </View>
                        </View>                        
                      </View>
                  </Pressable>
                </Link>
            )
        })}
       </View>
       :<Text>No hay valores para mostrar</Text>}
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
  
    con_des:{
        width:150
    },
    contenedor:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        boxShadow:'0px 0px 8px 1px black',
        margin:10,
        padding:10,
        borderRadius:20        
    },
    contenedorHeader:{
        display:'flex',
        flexDirection:'row',
        margin:10,        
        justifyContent:'space-between',
        alignContent:'center'
    },
    button: {
    padding: 8,
    borderRadius: 8,
  },
  buttonPressed: {
    borderWidth: 1,
    borderColor: 'black',
  },
  contenedor_date:{
    flexDirection:'row',
    
    justifyContent:'center',
    alignItems:'center' 
  },
})
