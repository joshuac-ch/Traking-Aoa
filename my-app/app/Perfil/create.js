import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { View,Text,TextInput, Pressable, Button, Image } from 'react-native'
import constantes from 'expo-constants'
import axios from 'axios'
import * as PickerImage from "expo-image-picker"
export default function create() {
  const [userDataForm, setuserDataForm] = useState({
    imagen:'',
    nombre:'',
    apellido:'',
    correo:'',
    telefono:'',
    pass:''
  })
  const host=constantes.expoConfig.extra.host
  const InsertUser=async()=>{
    try{
            await axios.post(`http://${host}:4000/usuarios/c`,userDataForm)
            alert("Usuario Registrado!!")
    }catch(err){
            alert("Hubo un error"+err.message)
   }
  }
  const AddImage=async()=>{
    let result=await PickerImage.launchImageLibraryAsync({
        mediaTypes:['images'],
        allowsEditing:true,
        aspect:[4,3],
        quality:1
        
    })
    if(!result.canceled){
        return setuserDataForm({...userDataForm,imagen:result.assets[0].uri})
    }
     
  }
  //paso sigueinte rellenar con datos flasos sobre la app
    return (
    <>
    <Stack.Screen options={{title:'Crear Perfil'}}></Stack.Screen>
    <View className='m-4'>
        <View>
            <Text>Perfil</Text>
        </View>
        <View>
            <Text>Imagen: </Text>
            <Button title='Agregar Imagen' onPress={AddImage}></Button>

        </View>
        <View>
            <Image style={{width:100,height:100}} source={{uri:userDataForm.imagen}}></Image>
        </View>
        <View>
            <Text>Nombre: </Text>
            <TextInput onChangeText={text=>setuserDataForm({...userDataForm,nombre:text})} value={userDataForm.nombre} placeholder='ingrese nombre'></TextInput>
        </View>
        <View>
            <Text>Apellido: </Text>
            <TextInput placeholder='ingrese apellido' onChangeText={text=>setuserDataForm({...userDataForm,apellido:text})} value={userDataForm.apellido}></TextInput>
        </View>
        <View>
            <Text>Telefono: </Text>
            <TextInput onChangeText={text=>setuserDataForm({...userDataForm,telefono:text})} value={userDataForm.telefono} placeholder='ingrese telefono'></TextInput>
        </View>
        <View>
            <Text>Correo: </Text>
            <TextInput placeholder='ingrese correo electronico' onChangeText={text=>setuserDataForm({...userDataForm,correo:text})} value={userDataForm.correo}></TextInput>
        </View>
        <View>
            <Text>Contraseña: </Text>
            <TextInput placeholder='ingrese contraseña segura' onChangeText={text=>setuserDataForm({...userDataForm,pass:text})} value={userDataForm.pass}></TextInput>
        </View>
        <View>
            <Pressable onPress={InsertUser}>
                <Text>Registrarse</Text>
            </Pressable>
        </View>
        
    </View>
    </>
  )
}
