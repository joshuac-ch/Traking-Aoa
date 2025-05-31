import React, { useCallback, useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import constantes from 'expo-constants' 
import axios from 'axios'
import Metas from '../../hooks/Metas'
import Actividades from '../../hooks/Actividades'
import Habitos from '../../hooks/Habitos'
export default function perfil() {
    const {user}=useUser()
    const navegar=useRouter()
    const [user_specific, setuser_specific] = useState([])
    const [alldata, setalldata] = useState([])
    const {FectMetas,metas}=Metas()
    const {FetchActividades,actividades}=Actividades()
    const {FecthHabitos,habitos}=Habitos()
    useEffect(()=>{
            FectMetas(),
        FecthHabitos(),
        FetchActividades()
    },[])
    
    useEffect(()=>{       
            if(metas.length>0){
                setalldata(metas)   
            }     
    },[metas])
    const host=constantes.expoConfig.extra.host
    const FectUserSpecific=async()=>{
        try{
            const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
            setuser_specific(data)
        }catch(err){
            alert("Hubo un error: ",err.message)
        }
    }
    useFocusEffect(
        useCallback(()=>{
            if(user.id){
                FectUserSpecific()
            }
        },[])
    )
  return (
   <>
   <ScrollView>
    <Stack.Screen options={{headerShown:false}}></Stack.Screen>
   <View style={styles.contenedor_principal}>
    <View >
        <Text >{user_specific.nombre}</Text>
    </View>
    <View style={{alignItems:'center'}}>
        <Image style={styles.image} source={{uri:user_specific.imagen}}></Image>
        <Text >{user_specific.correo}</Text>
    </View>
    <View style={styles.contenedor_sub}>
        <View style={styles.box}>
            <Text>390</Text>
            <Text>Siguiendo</Text>
        </View>
        <View style={styles.box}>
            <Text>322K</Text>
            <Text>Seguidores</Text>
        </View>
        <View style={styles.box}>
            <Text>4</Text>
            <Text>Me gusta</Text>
        </View>
    </View>
    <View style={styles.contenedor_edit}>
        <View style={styles.contenedor}>
            <Pressable onPress={()=>navegar.push(`/Perfil/${user_specific.id}`)}>
                <Text>Editar Perfil</Text>
            </Pressable>
        </View>
        <View style={styles.contenedor}>
            <Pressable>
                <Text>Compartir Perfil</Text>
            </Pressable>
        </View>      
        
    </View>
   
   </View>
 <View>
    <View style={{display:'flex',flexDirection:'row'}}>
                {alldata!=null?
               alldata.map((a)=>{
                    return(
                       <View style={styles.proyecto_c}>
                               <View style={styles.div_c}>
                                <Text>{a.id}</Text>
                               </View>
                            </View> 
                    )
                })
                :<Text>No hay datos</Text>}
                    
              </View>
        <View >
            <Text style={styles.proyecto_title}>Proyectos</Text>
        </View>
        <View style={styles.proyecto}>
              
            <View style={{display:'flex',flexDirection:'row'}}>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text >Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
            </View>
            
            
        </View>
        
    </View> 
    </ScrollView>   
   </>
  )
}
const styles=StyleSheet.create({
    proyecto_title:{
        textAlign:'center',
        padding:20,
    },
    proyecto:{
        flexDirection:'column',
        justifyContent:'center'       
    },
    proyecto_c:{
        flexDirection:'row',
        justifyContent:'flex-end',
        backgroundColor:'gray',
        borderRadius:5,
        width:135,
        height:135,
        margin:.8
    },
    div_c:{
       
        padding:10,
    },
    contenedor:{
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'white',
        padding:10,
        borderRadius:10,
        margin:10,
    },
    contenedor_edit:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        
    },
    contenedor_principal:{
        display:'flex',       
        justifyContent:'center',
        alignItems:'center',
        
        
       
    },
    contenedor_sub:{        
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    box:{        
        alignItems:'center',
        justifyContent:'center',
         padding:20
    },
    image:{
        
        width:100,
        height:100,
        borderRadius:50,
        
    }
})