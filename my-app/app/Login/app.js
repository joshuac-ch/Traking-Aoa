import { useCallback, useEffect, useState } from 'react'

import {Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import usuarios from '../../hooks/usuarios'
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router'
import { useUser } from '../../components/UserContext'

import login from "../../assets/login1.png"
import ramas from "../../assets/ramas4.png"

import fondo2 from "../../assets/fondoprueba.png"
import fondov2 from "../../assets/fondov2.png" 

import { IconEntrada } from '../../assets/Icons'
export default function AppPrincipal() {
    const {setUser}=useUser()
  const {FectUsuarios,dataUser}=usuarios()
    useFocusEffect(
        useCallback(()=>{
            FectUsuarios()
        },[])
    )
    
    const [correo, setcorreo] = useState('ninonakano@gmail.com')
    const [pass, setpass] = useState('123')
    const navegar=useRouter()
    const VeificarUse=()=>{
        const datos=dataUser.find((d)=>d.correo==correo && d.pass==pass)
        if(datos){
            setUser(datos)
            navegar.push("/Panel")
        }else{
            navegar.push("/Login")
        }
    }
    const LoginLogo=()=>{
        return(
            <Image source={login} style={{width:100,height:100,borderRadius:20}}></Image>
        )
    }
    
  return (
   <>
   
   
   <Stack.Screen options={{headerShown:false}}></Stack.Screen>
   <View style={{flex: 1,backgroundColor:"#807c76"}}>
    <ImageBackground source={fondov2} style={styles.fondo2}></ImageBackground>
    <ImageBackground source={fondo2} style={styles.fondo} resizeMode='contain' imageStyle={{alignSelf:"flex-end"}} >
        
    <View style={styles.contenedor}>
    <View style={{position:"absolute",top:180,left:100,alignItems:"center"}}>
        <LoginLogo></LoginLogo>    
    </View> 
    <View style={{position:"absolute",top:260,left:0,width:280}} className='m-4'>
        <Text >Correo</Text>
        <TextInput value={correo} onChangeText={setcorreo} className='rounded w-full bg-gray border-2' placeholder='example@gmail.com'></TextInput>
    </View>
    <View style={{position:"absolute",top:340,left:0,width:280}} className='m-4'>
        <Text>Password</Text>
        <TextInput value={pass} onChangeText={setpass} className='rounded w-full bg-gray border-2' placeholder='*********'></TextInput>
    </View>
    <View  style={{position:"absolute",top:440,left:5}} className='m-4 flex-row'>
        <Link style={styles.cuenta} href={"/Perfil/create"}>No tienes cuenta?</Link>
    </View>
    <View style={{position:"absolute",bottom:250,left:120}} className='flex-row justify-center p-4'>
        <Pressable onPress={VeificarUse} className='bg-white rounded-full '>
            <IconEntrada></IconEntrada>
        </Pressable>
    </View>
    
    </View>
    </ImageBackground>
  
   </View>
  
   </>
)}
//
const styles=StyleSheet.create({
    cuenta:{
        textDecorationLine:"underline",
        fontWeight:"700"
    },
    fondo2:{
      
      position: 'absolute',
      opacity:0.7,
      width: '100%',
      height: '100%',
        backgroundColor:"#625f59"
    },
    fondo: {
      
      position: 'absolute',
        
      width: '100%',
      height: '100%',
    
    flex: 1,    
    alignItems: 'center',
  },
    text_input:{
        borderRadius:0,
    },
    contenedor:{
        width:"80%",
        flex:1,
        
        justifyContent:'center',
        alignContent:'center'
    },   
    
})