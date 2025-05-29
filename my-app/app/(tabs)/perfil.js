import React, { useCallback, useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import constantes from 'expo-constants' 
import axios from 'axios'
export default function perfil() {
    const {user}=useUser()
    const navegar=useRouter()
    const [user_specific, setuser_specific] = useState([])
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
        <View >
            <Text style={styles.proyecto_title}>Proyectos</Text>
        </View>
        <View style={styles.proyecto}>
            <View>
                <View style={styles.proyecto_c}></View>
                <View style={styles.proyecto_c}></View>
                <View style={styles.proyecto_c}></View>
            </View>
            <View>
                <View style={styles.proyecto_c}></View>
                <View style={styles.proyecto_c}></View>
                <View style={styles.proyecto_c}></View>
            </View>
            <View>
                <View style={styles.proyecto_c}></View>
                <View style={styles.proyecto_c}></View>
                <View style={styles.proyecto_c}></View>
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
        flexDirection:'row',
        justifyContent:'center'       
    },
    proyecto_c:{
         backgroundColor:'black',
        borderRadius:5,
        width:135,
        height:135,
        margin:.8
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