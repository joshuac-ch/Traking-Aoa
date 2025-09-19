import React, { useCallback, useEffect } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Actividades from '../../hooks/Actividades'
import { IconActivity, IconAdd, Iconclock, IconDate, IconDelete } from '../../assets/Icons'
import { Link, Stack, useFocusEffect } from 'expo-router'
import axios from 'axios'
import constantes from "expo-constants"
import { useUser } from '../../components/UserContext'
import GetImage from '../../utils/GetImage'
import getHost from '../../hooks/getHost'
export default function ActividadesDiarias() {
  const {user}=useUser()  
  const {FetchActividades,actividades}=Actividades()
  
  const EliminarActividad=async(id)=>{
      
    try{
        const host=getHost()
        await axios.delete(`http://${host}:4000/actividades/d/${id}`)
        //await axios.delete(`http://${host}:4000/publicaciones/r/d/${id}`)
        alert("Se elimino correcatemente la publicacion")
        FetchActividades()
    } catch(err){
        alert("Se elimino correctamente la publicacion ")
    }
  }
  useFocusEffect(
    useCallback(()=>{
        if(user.id){
            FetchActividades()
        }
    },[user.id])
  )  
  return (
    <>
    
    <Stack.Screen options={{title:"Actividades",headerStyle:{backgroundColor:"#131313"},headerTintColor:"white",contentStyle: { backgroundColor: "#131313" }}}></Stack.Screen>
    
    <ScrollView style={{backgroundColor:"#131313"}}>
    <View className=''>
             <View style={styles.header_Acti}>
            <Text className='font-black text-lg text-white'>Hoy</Text>
            <View >
                <Link href={'/Actividades/Create'} asChild>
                <Pressable >
                    <IconAdd color='white'></IconAdd>
                </Pressable>
                </Link>        
            </View>
         </View>
    {actividades.length>0?
    <View>
        {actividades.map((a,i)=>{
            return(
                <Link key={i} href={`Actividades/${a.id}`} asChild>
                    <Pressable>
                        <View style={styles.contenedor} key={a.id}>
                            
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                
                                <View style={{marginRight:10}}>
                                    <Iconclock color='white'></Iconclock>
                                </View>
                                <View >
                                    
                                    <Text style={{color:"white"}}>{a.titulo}</Text>                            
                                    <Text style={{color:"white"}}> {a.fecha?new Date(a.fecha).toLocaleDateString():''}</Text>
                                </View> 
                            </View>                       
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Pressable onPress={()=>EliminarActividad(a.id)}>
                                        <IconDelete color='white'></IconDelete>
                                    </Pressable>
                            </View>                   
                        </View>
                    </Pressable>
                </Link>

            )
        })}       
    </View>:
    <View style={{justifyContent:"center",alignItems:"center",height:100}}>
            <View style={{borderRadius:99,borderColor:"#4b4b4b",borderStyle:"solid",padding:7,borderWidth:2}}>
              <IconActivity color='white'></IconActivity>
            </View>
            <View style={{paddingTop:5}}>
              <Text style={{fontWeight:"600",color:"white"}}>No se encontro ningun registro</Text>
            </View>
    </View>
    }
    </View>
    </ScrollView>
    </>
  )
}
const styles=StyleSheet.create({
    boton:{
        boxShadow:'0px 0px 8px 1px black',
        padding:5,        
        backgroundColor:'transparent',
        borderRadius:10

    },
    contenedor:{
        display:'flex',
        flexDirection:'row',
        alignItems:"center",
        backgroundColor:"#252525",
        justifyContent:'space-between',        
        padding:10,
        marginLeft:10,
        marginRight:10,
        marginTop:7,
        marginBottom:7,        
        borderRadius:10,
        boxShadow:'0px 0px 8px 1px black'
    },
    subcontenedor:{
        width:250
    },
    header_Acti:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:10, 
    },
    cont_fecha:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',    
    }

})
