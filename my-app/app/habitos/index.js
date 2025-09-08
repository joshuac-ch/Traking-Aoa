import React, { useCallback, useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import Habitos from '../../hooks/Habitos'
import { IconAdd, IconCircle, Iconclock, IconDate, IconDelete, IconDontActivity } from '../../assets/Icons'
import { Link, Stack, useFocusEffect } from 'expo-router'
import axios from 'axios'
import contantes from "expo-constants"
import { useUser } from '../../components/UserContext'
import getHost from '../../hooks/getHost'
export default function index() {
  const {user}=useUser()
  const {FecthHabitos,habitos}=Habitos()  
  const EliminarHabito=async(id)=>{
    try{
      const host=getHost()
      await axios.delete(`http://${host}:4000/habitos/d/${id}`)
      ToastAndroid.show("Se elimino correctamente el habito",ToastAndroid.SHORT)
      FecthHabitos()
    }catch(err){
      alert("Hubo un error"+err.message)
    }
  }
  
  useFocusEffect(
    useCallback(()=>{
      if(user.id){
        FecthHabitos()
      }
    },[user.id])
  )  
  return (
    <ScrollView>
      <Stack.Screen options={{title:'Habitos'}}></Stack.Screen>
      <View>
       <View style={styles.contenedorHeader}>
            <Text className='font-black'>Hoy</Text>
            <Link href={'/Habitos/create/'} asChild>
                <Pressable>  
                  <IconAdd />  
                </Pressable>
            </Link>
       </View>
       {habitos.length>0?
       <View >
        {habitos.map((h)=>{
            return(
                <Link key={h.id} href={`/Habitos/${h.id}`} asChild>
                  <Pressable>
                      <View style={styles.contenedor} key={h.id}>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                          <View style={{marginRight:10}}>
                            <Iconclock ></Iconclock>
                          </View>
                            <View>                               
                                <Text>{h.titulo}</Text>
                              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                                 <Text>{h.fecha_inicio?new Date(h.fecha_inicio).toLocaleDateString():''}</Text>  
                                 
                              </View>
                            </View>                         
                        </View>                      
                        
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Pressable onPress={()=>EliminarHabito(h.id)}>
                              <IconDelete></IconDelete>
                          </Pressable>
                        </View>                                        
                      </View>
                  </Pressable>
                </Link>
            )
        })}
       </View>
       :<View style={{justifyContent:"center",alignItems:"center",height:100}}>
        <View style={{borderRadius:99,borderColor:"black",borderStyle:"solid",padding:7,borderWidth:2}}>
          <IconDontActivity></IconDontActivity>
        </View>
        <View style={{paddingTop:5}}>
          <Text style={{fontWeight:"600"}}>No se encontro ningun registro</Text>
        </View>
        </View>}
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
        padding:5,
        marginLeft:10,
        marginRight:10,
        marginTop:7,
        marginBottom:7,
        borderRadius:10        
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
