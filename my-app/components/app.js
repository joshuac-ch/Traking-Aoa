import React from 'react'
import "../global.css"
import { Button, Pressable, Text, TextInput, View } from 'react-native'
export default function AppPrincipal() {
  return (
   <>
    <Text className="text-4xl text-center font-black">Login</Text>
    <View className='m-4'>
        <Text>Correo</Text>
        <TextInput className='rounded w-full bg-gray border-2' placeholder='example@gmail.com'></TextInput>
    </View>
    <View className=' m-4'>
        <Text>Password</Text>
        <TextInput className='rounded w-full bg-gray border-2' placeholder='*********'></TextInput>
    </View>
    <View className='flex-row justify-center p-4'>
        <Pressable className='bg-blue-500  rounded-full p-4'>
            <Text className='color-white text-lg '>Enviar datos</Text>
        </Pressable>
    </View>
   </>
)}
