import { useCallback, useEffect, useState } from 'react'

import {Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import usuarios from '../../hooks/usuarios'
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router'
import { useUser } from '../../components/UserContext'

import login from "../../assets/login1.png"
import ramas from "../../assets/ramas4.png"
import lady from "../../assets/lady.png"
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
            ToastAndroid.show(`Correo o contraseña incorrecta`,ToastAndroid.BOTTOM)
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
    {/*Fondo capa 1 base de ramas */}
    <ImageBackground source={fondov2} style={styles.fondo2}></ImageBackground>   
    {/*Fondo capa 2 color con capa 2 */}
    <ImageBackground style={{position: 'absolute',
      opacity:0.7,
      width: '100%',
      height: '100%',backgroundColor:"#191717"}}></ImageBackground>
        
    <View style={styles.contenedor}>
    <View style={{position:"absolute",top:180,left:100,alignItems:"center"}}>
        
        {/* <LoginLogo></LoginLogo> */}    
    </View> 
    
    <View style={{position:"absolute",top:260,left:15,width:350}} className='m-4'>
        <Text style={{color:"#141414"}}>Correo</Text>
        <TextInput value={correo} onChangeText={setcorreo} style={styles.text_input} placeholder='example@gmail.com'></TextInput>
    </View>
    <View style={{position:"absolute",top:340,left:15,width:350}} className='m-4'>
        <Text style={{color:"#141414"}}>Password</Text>
        <TextInput value={pass} onChangeText={setpass} style={styles.text_input} placeholder='*********'></TextInput>
    </View>
    <View  style={{position:"absolute",top:440,left:20,zIndex:1}} className='m-4 flex-row'>
        <Link style={styles.cuenta} href={"/Perfil/create"}>No tienes cuenta?</Link>
    </View>
    <View style={{position:"absolute",bottom:250,left:120,zIndex:1}} className='flex-row justify-center p-4'>
        <Pressable onPress={VeificarUse} className='rounded-full '>
            <IconEntrada></IconEntrada>
        </Pressable>
    </View>
    
    </View>
    {/*Fondo Capa 3 */}
    <Image source={lady} style={styles.flor} resizeMode='contain'></Image>    
    
  
   </View>
  
   </>
)}
//{/*backgroundColor:"#191717"*/} flor
const styles=StyleSheet.create({
    cuenta:{
       
        fontWeight:"800",
        color:"#db515e",
    },
    flor:{
     position: 'absolute',
     zIndex:0,
     padding:0,
      opacity:0.7,
      bottom:25,
      right:-140,
      width: 600,
      height: 600,
      
    },
    fondo2:{      
      position: 'absolute',
      opacity:0.7,
      width: '100%',
      height: '100%',
     backgroundColor:"#191717"
    },
    fondo: {      
      position: 'absolute',
      width: '100%',
      height: '100%',
      
    
    flex: 1,    
    alignItems: 'center',
  },
    text_input:{
        width:300,
        marginTop:5,
        borderRadius:0,
        backgroundColor:"gray",
        borderColor:"gray",
        color:"black",
        borderRadius:10,
        borderWidth:2
    },
    contenedor:{
        width:"80%",
        flex:1,        
        justifyContent:'center',
        alignContent:'center'
    },   
    
})