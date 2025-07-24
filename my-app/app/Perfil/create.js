import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { View,Text,TextInput, Pressable, Button, Image, StyleSheet } from 'react-native'
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
            <Text>Foto: </Text>
            {userDataForm.imagen&&(
                <Image style={styles.image} source={{uri:userDataForm.imagen}}></Image>
            )}
            

        </View>
        <View>
            <Button title='Agregar Imagen' onPress={AddImage}></Button>
        </View>
        <View>
            <Text>Nombre: </Text>
            <TextInput style={styles.input_form} onChangeText={text=>setuserDataForm({...userDataForm,nombre:text})} value={userDataForm.nombre} placeholder='ingrese nombre'></TextInput>
        </View>
        <View>
            <Text>Apellido: </Text>
            <TextInput style={styles.input_form} placeholder='ingrese apellido' onChangeText={text=>setuserDataForm({...userDataForm,apellido:text})} value={userDataForm.apellido}></TextInput>
        </View>
        <View>
            <Text>Telefono: </Text>
            <TextInput style={styles.input_form} onChangeText={text=>setuserDataForm({...userDataForm,telefono:text})} value={userDataForm.telefono} placeholder='ingrese telefono'></TextInput>
        </View>
        <View>
            <Text>Correo: </Text>
            <TextInput style={styles.input_form} placeholder='ingrese correo electronico' onChangeText={text=>setuserDataForm({...userDataForm,correo:text})} value={userDataForm.correo}></TextInput>
        </View>
        <View>
            <Text>Contraseña: </Text>
            <TextInput style={styles.input_form} placeholder='ingrese contraseña segura' onChangeText={text=>setuserDataForm({...userDataForm,pass:text})} value={userDataForm.pass}></TextInput>
        </View>
        <View>
            <Pressable style={styles.registrar} onPress={InsertUser}>
                <Text style={{textAlign:'center',color:'white'}}>Registrarse</Text>
            </Pressable>
        </View>
        
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    image:{
        alignSelf:'center',
        width:150,
        height:150,
        borderRadius:100,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        margin:10
    },
    input_form:{
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        width:'100%',
        height:45,
        marginTop:10,
        marginBottom:10,
        borderRadius:10
    },
    registrar:{
        borderRadius:10,
        borderStyle:'solid',
        borderWidth:2,
        borderColor:'transparent',
        backgroundColor:'purple',       
        padding:10,
        marginTop:10,
        alignSelf:'center',
        width:100
    }    
})
