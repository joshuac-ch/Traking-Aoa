import { useCallback, useEffect, useState } from 'react'

import {Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import usuarios from '../../hooks/usuarios'
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router'
import { useUser } from '../../components/UserContext'
import portada from "../../assets/portada1.png"
import imagen_principal from "../../assets/imagen1.png"
import login from "../../assets/login1.png"
import ramas from "../../assets/ramam.png"
import fondo from "../../assets/fondo_flora.png"
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
    const Nube=({top,left,size=80,ancho=80,color="pink"})=>(
        <View style={{
        position:"absolute",
        top:top,
        left:left,
        height:size,
        width:ancho,
        backgroundColor:color,
        borderRadius:99  
        }}>
            
        </View>
    )
    const LadyFlor=({abajo,lef,arriba="",isq=""})=>{
       return(
         <View style={{position:"absolute",
            bottom:abajo,
            left:lef,
            top:arriba,
            right:isq
        }}>
            <Image source={portada} alt='nose encuentra' style={{width:100,height:100}}></Image>
        </View>
       )
    }
    const LoginLogo=()=>{
        return(
            <Image source={login} style={{width:120,height:120,borderRadius:20}}></Image>
        )
    }
    const ConjuntoFlores=({arriba,abajo=0,lef})=>{
        return(
            <View style={{position:"absolute",bottom:abajo,top:arriba,left:lef}}>
                <Image source={imagen_principal} style={{width:100,height:100,borderRadius:20}}></Image>
            </View>
        )
    }
    const Ramas=()=>{
        return(
            <Image source={ramas} style={{width:250,height:200}}></Image>
        )
    } 
  return (
   <>
   
   
   <Stack.Screen options={{headerShown:false}}></Stack.Screen>
   <View style={{flex: 1,backgroundColor:"#807c76"}}>
    <ImageBackground source={fondo} style={styles.fondo} resizeMode='stretch' imageStyle={{alignSelf:"flex-end"}} >
    {/*
    <View style={{position:"absolute",top:30,left:-20}}>
   
     <Nube top={50} size={80} left={150}></Nube>
     <Nube top={20} size={110} left={100}></Nube>
     <Nube top={50} size={80} left={50}></Nube>
    </View>
  <View style={{position:"absolute",bottom:250,left:160}}>
     <Nube top={50} size={30} ancho={40} left={120}></Nube>
     <Nube top={30} size={50} ancho={40} left={100}></Nube>
     <Nube top={50} size={30} ancho={40} left={80}></Nube>
  </View>
  <View style={{position:"absolute",top:300,left:10}}>
    <Image source={ramas} style={{width:`${60}`,height:`${60}`}}></Image>    
  </View>
 <LadyFlor abajo={0} lef={10}></LadyFlor>
 <LadyFlor abajo={0} isq={0} arriba={0}></LadyFlor>
    <ConjuntoFlores></ConjuntoFlores>
    <View style={{position:"absolute",top:0,left:170}}>
    <Ramas></Ramas>
   </View>
   <View style={{position:"absolute",bottom:0}}>
    <Ramas></Ramas>
   </View>
   <View style={{position:"absolute",bottom:0,left:200}}>
    <Ramas></Ramas>
   </View>
    */}
    
    <View style={styles.contenedor}>
    <View style={{alignItems:"center"}}>
        <LoginLogo></LoginLogo>    
    </View> 
    <View className='m-4'>
        <Text >Correo</Text>
        <TextInput value={correo} onChangeText={setcorreo} className='rounded w-full bg-gray border-2' placeholder='example@gmail.com'></TextInput>
    </View>
    <View className=' m-4'>
        <Text>Password</Text>
        <TextInput value={pass} onChangeText={setpass} className='rounded w-full bg-gray border-2' placeholder='*********'></TextInput>
    </View>
    <View className='m-4 '>
        <Link className='text-right' href={"/Perfil/create"}>No tienes cuenta?</Link>
    </View>
    <View className='flex-row justify-center p-4'>
        <Pressable onPress={VeificarUse} className='bg-blue-500  rounded-full p-4'>
            <Text  className='color-white text-lg '> Enviar datos</Text>
        </Pressable>
    </View>
    </View>
    </ImageBackground>
  
   </View>
  
   </>
)}
//
const styles=StyleSheet.create({
    fondo: {
       
    position: 'absolute',
      bottom: -0,
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