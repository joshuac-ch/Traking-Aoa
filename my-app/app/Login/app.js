import { useCallback, useEffect, useState } from 'react'

import {Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import usuarios from '../../hooks/usuarios'
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router'
import { useUser } from '../../components/UserContext'
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
    const Flor=({ancho,top,lef,size=100,color="pink"})=>{
        <View style={{
            top:top,
            left:lef,
            height:size,
            backgroundColor:color,
            width:ancho,
            borderRadius:20
        }}>

        </View>
    }
  return (
   <>
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
  <View style={{
    width:20,
    height:100,
    backgroundColor:"red",
    position:"absolute",
    bottom:280,
    left:50,
    borderRadius:20
  }}>
    
  </View>
    <Stack.Screen options={{headerShown:false}}></Stack.Screen>
    <View style={styles.contenedor}>
        <Text className="text-4xl text-center font-black">Login</Text>
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
   </>
)}
const styles=StyleSheet.create({
    contenedor:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
    estilos_nubes1:{
        position:"absolute",
        top:50,
        left:150,
        height:80,
        width:80,
        backgroundColor:"pink",
        borderRadius:99        
    },
    estilos_nubes2:{
        position:"absolute",
        top:20,
        left:100,
        height:110,
        width:80,
        backgroundColor:"pink",
        borderRadius:99        
    },
    estilos_nubes3:{
        position:"absolute",
        top:50,
        left:50,
        height:80,
        width:80,
        backgroundColor:"pink",
        borderRadius:99        
    }
    
})