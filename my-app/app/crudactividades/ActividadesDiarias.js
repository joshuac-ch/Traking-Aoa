import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Actividades from '../../hooks/Actividades'
import { IconDate, IconDelete } from '../../assets/Icons'
import { Link } from 'expo-router'
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
    <ScrollView>
        <View style={styles.boton} >
        <Pressable >
            <Link href={'/crudactividades/Create'}>Crear Actividad</Link>
           
        </Pressable>
    </View>
    {actividades!=null?
    <View>
        {actividades.map((a)=>{
            return(
                <Link key={a.id} href={`crudactividades/${a.id}`} asChild>
                    <Pressable>
                        <View style={styles.contenedor} key={a.id}>
                        <View style={styles.subcontenedor} className=''>
                            <Text>Titulo: {a.titulo}</Text>
                            <Text className=''>{a.descripcion}</Text>
                        </View>
                        <View className=''>
                            <View>
                                <IconDate/>
                                <Text> {a.fecha?new Date(a.fecha).getFullYear():''}</Text>
                            </View>
                            <View>
                                <Pressable onPress={()=>EliminarActividad(a.id)}>
                                    <IconDelete></IconDelete>
                                </Pressable>
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
    </ScrollView>
    </>
  )
}
const styles=StyleSheet.create({
    boton:{
        boxShadow:'0px 0px 8px 1px black',
        padding:10,
        alignItems:'center',
        marginTop:10,
        marginLeft:20,
        width:120,
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
    }

})
