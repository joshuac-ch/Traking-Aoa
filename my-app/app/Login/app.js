import { useEffect, useState } from 'react'

import {Pressable, StatusBar, Text, TextInput, View } from 'react-native'
import usuarios from '../../hooks/usuarios'
import { Link, Stack, useRouter } from 'expo-router'
import { useUser } from '../../components/UserContext'
export default function AppPrincipal() {
    const {setUser}=useUser()
  const {FectUsuarios,dataUser}=usuarios()
    useEffect(()=>{
        FectUsuarios()
    },[])
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
  return (
   <>
    <Stack.Screen options={{headerShown:false}}></Stack.Screen>
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
   </>
)}
