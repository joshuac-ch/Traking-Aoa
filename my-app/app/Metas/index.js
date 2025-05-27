import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import Metas from '../../hooks/Metas'
import { IconAdd, IconDelete } from '../../assets/Icons'
import { Link, Stack } from 'expo-router'
import axios from 'axios'
import constantes from 'expo-constants'
export default function index() {
  const {user}=useUser()
  const {FectMetas,metas}=Metas()  
  useEffect(()=>{
    FectMetas()
  },[])
  const host=constantes.expoConfig.extra.host
  const BTNDelete=async(id)=>{
    try{
        await axios.delete(`http://${host}:4000/metas/d/${id}`)
        alert("Se elimino la meta correctamente")
    }catch(err){
        alert("Hubo un error"+err.message)
    }
  }
  return (
    <ScrollView>
        <Stack.Screen options={{title:'Metas'}}></Stack.Screen>
        <View >
      <View style={styles.contendorHeader}>
          <Text className='p-4'>Metas del usuario {user.nombre}</Text>
          <Link href={"/Metas/create"} asChild> 
        <Pressable>
              <IconAdd></IconAdd>
        </Pressable>
          </Link>
      </View>
    <View>
    {metas!=null?
    <View>
        {metas.map((m)=>{
            const fechaLImite=new Date(m.fecha_limite)
            const fechaInicio=new Date(m.fecha_inicio)
            const hoy=new Date()
            const tiempo_total=fechaLImite-fechaInicio
            const tiempo_Acumulado=hoy-fechaInicio
            const progreso=Math.min(tiempo_Acumulado/tiempo_total,1)
            
            return(
                <Link key={m.id} href={`/Metas/${m.id}`} asChild>
                    <Pressable>
                        <View style={styles.contendor} key={m.id}>
                                <View style={styles.contenedorPrincipal} >
                        <View>
                            <View>
                                <Text>Titulo: </Text>
                                <Text>{m.titulo}</Text>
                            </View>
                            <View>
                                <Text>Descripcion: </Text>
                                <Text>{m.descripcion}</Text>
                            </View>
                            <View>
                                <Text>Proceso</Text>
                                
                              
                            </View>
                        </View>
                        <View>
                            <View style={styles.btn_delete} >
                                <Text>Meta: {m.meta_total}</Text>
                                <Pressable onPress={()=>BTNDelete(m.id)}>
                                    <IconDelete ></IconDelete>    
                                </Pressable> 
                            </View>
                            <Text>Fecha inicio:{m.fecha_inicio?new Date(m.fecha_inicio).toLocaleDateString():''}</Text>
                            <Text>Fecha limite:{m.fecha_limite?new Date(m.fecha_limite).toLocaleDateString():''}</Text>
                            
                        </View>                        
                    </View>
                    <View style={{backgroundColor:'white',borderRadius:20,width:'100%',height:10}}>
                        <View style={{backgroundColor:progreso<1?'purple' : '#2196f3',width:`${progreso*100}%`,height:10,borderRadius:20}}></View>
                    </View>
                        </View>
                    
                    
                    </Pressable>
                </Link>
            )
        })}
    </View>
    :<Text>No se encontraron datos</Text>}
    </View>
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    contendor:{
        padding:10,
        margin:10,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        borderRadius:10
    },
    contendorHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:10
    },
    contenedorPrincipal:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    barra:{
        width:100,
        borderRadius:50,
        backgroundColor:'purple'
    },
    btn_delete:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       alignItems:'center'   
    }
})