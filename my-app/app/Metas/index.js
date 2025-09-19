import React, { useCallback, useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import Metas from '../../hooks/Metas'
import { IconAdd, IconDelete } from '../../assets/Icons'
import { Link, Stack, useFocusEffect } from 'expo-router'
import axios from 'axios'
import constantes from 'expo-constants'
import getHost from '../../hooks/getHost'
export default function Index() {
  const {user}=useUser()
  const {FectMetas,metas}=Metas()  
  
  const host=getHost()
  const BTNDelete=async(id)=>{
    try{
        await axios.delete(`http://${host}:4000/metas/d/${id}`)
        alert("Se elimino la meta correctamente")
        FectMetas()
    }catch(err){
        alert("Hubo un error"+err.message)
    }
  }  
  useFocusEffect(
    useCallback(()=>{
       if(user.id){
        FectMetas()
       }
    },[user.id])
  )
  
  return (
    <ScrollView style={{backgroundColor:"#131313"}}>
        <Stack.Screen options={{title:'Metas',headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
        <View >
      <View style={styles.contendorHeader}>
          <Text className='p-4 text-white font-semibold'>Metas del usuario {user.nombre}</Text>
          <Link href={"/Metas/create"} asChild> 
        <Pressable>
              <IconAdd color='white'></IconAdd>
        </Pressable>
          </Link>
      </View>
    <View>
    {metas.length>0?
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
                                <Text style={{color:"white"}}>Titulo: </Text>
                                <Text style={{color:"white"}}>{m.titulo}</Text>
                            </View>
                            <View>
                                <Text style={{color:"white"}}>Descripcion: </Text>
                                <Text style={{color:"white"}}>{m.descripcion}</Text>
                            </View>
                            <View>
                                <Text style={{color:"white"}}>Proceso</Text>
                                
                              
                            </View>
                        </View>
                        <View>
                            <View style={styles.btn_delete} >
                                {/*<Text>Meta: {m.meta_total}</Text> */}
                                <Pressable onPress={()=>BTNDelete(m.id)}>
                                    <IconDelete color='white' ></IconDelete>    
                                </Pressable> 
                            </View>
                            <Text style={{color:"white"}}>Fecha inicio: {m.fecha_inicio? new Date(m.fecha_inicio).getMonth()+"/"+ new Date(m.fecha_inicio).getDate():''}</Text>
                            <Text style={{color:"white"}}>Fecha limite: {m.fecha_limite?new Date(m.fecha_limite).getMonth()+"/"+ new Date(m.fecha_limite).getDate():''}</Text>
                            
                        </View>                        
                    </View>
                    <View style={{backgroundColor:'#4b4b4b',borderRadius:20,width:'100%',height:10}}>
                        <View style={{backgroundColor:progreso<1?'#2196f3' : '#db515e',width:`${progreso*100}%`,height:10,borderRadius:20}}></View>
                    </View>
                        </View>
                    
                    
                    </Pressable>
                </Link>
            )
        })}
    </View>
    :<Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>No se encontraron datos</Text>}
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
        borderColor:'#4b4b4b',
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
       justifyContent:'flex-end',
       alignItems:'center'   
    }
})