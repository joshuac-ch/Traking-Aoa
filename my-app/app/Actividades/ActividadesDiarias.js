import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Actividades from '../../hooks/Actividades'
import { IconAdd, IconDate, IconDelete } from '../../assets/Icons'
import { Link, Stack } from 'expo-router'
import axios from 'axios'
import constantes from "expo-constants"
export default function ActividadesDiarias() {
  const {FetchActividades,actividades}=Actividades()
  useEffect(()=>{
    FetchActividades()
  },[])
  const EliminarActividad=async(id)=>{
    try{
        const host=constantes.expoConfig.extra.host
        await axios.delete(`http://${host}:4000/actividades/d/${id}`)
        alert("Se elimino correcatemente la actividad")
        FetchActividades()
    } catch(err){
        alert("hubo un error",err.message)
    }
  }  
  return (
    <>
    <Stack.Screen options={{title:"Actividades"}}></Stack.Screen>
    <ScrollView>
    <View className=''>
             <View style={styles.header_Acti}>
            <Text className='font-black text-lg'>Actividades</Text>
            <View >
                <Link href={'/Actividades/Create'} asChild>
                <Pressable >
                    <IconAdd ></IconAdd>
                </Pressable>
                </Link>        
            </View>
         </View>
    {actividades!=null?
    <View>
        {actividades.map((a)=>{
            return(
                <Link key={a.id} href={`Actividades/${a.id}`} asChild>
                    <Pressable>
                        <View style={styles.contenedor} key={a.id}>
                        <View style={styles.subcontenedor} className=''>
                            <Text>Titulo: {a.titulo}</Text>
                            <Text>Descripcion: </Text>
                            <Text className=''>{a.descripcion}</Text>
                        </View>
                        <View className=''>
                             <View style={{alignItems:'flex-end'}}>
                                <Pressable onPress={()=>EliminarActividad(a.id)}>
                                    <IconDelete></IconDelete>
                                </Pressable>
                            </View>
                            <View style={styles.cont_fecha}>
                                <IconDate/>
                                <Text> {a.fecha?new Date(a.fecha).toLocaleDateString():''}</Text>
                            </View>
                           
                        </View>
                        </View>
                    </Pressable>
                </Link>

            )
        })}       
    </View>:
    <Text>No hay datos</Text>
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
        justifyContent:'space-between',
        width:400,
        padding:10,
        marginTop:20,
        marginLeft:5,
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
