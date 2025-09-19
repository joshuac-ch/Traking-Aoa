import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import axios from 'axios'
import Constants from "expo-constants"
import { Stack, useRouter } from 'expo-router'
import getHost from '../../hooks/getHost'
export default function Create() {
  const {user}=useUser()
  const navegar=useRouter()
  const [fromHabitos, setfromHabitos] = useState({
    titulo:'',
    descripcion:'',
    frecuencia:'',
    imagen:'',   
    activo:1,
    usuario_id:user.id
  }) 
  const CreateHabito=async()=>{
    try{
      const local=getHost()
      await axios.post(`http://${local}:4000/habitos/c`,fromHabitos)
      ToastAndroid.show("Se enviaron los datos correctamente",ToastAndroid.TOP)
      
      navegar.replace("/Panel")
    }catch(err){
      alert(err.message)
    }
  }
  return (
    <ScrollView style={{backgroundColor:"#131313"}}>
    <View >
      <Stack.Screen options={{title:'Crear Habitos',headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
        
        <View className='m-4'>
          <View>
          <Text style={{color:"white"}}>Imagen: </Text>
          <TextInput style={styles.form_input} value={fromHabitos.imagen} onChangeText={text=>setfromHabitos({...fromHabitos,imagen:text})} placeholder='ingrese link de imagen'></TextInput>
        </View>
        <View>
          <Text style={{color:"white"}}>Titulo: </Text>
          <TextInput style={styles.form_input} value={fromHabitos.titulo} onChangeText={text=>setfromHabitos({...fromHabitos,titulo:text})} placeholder='ingrese titulo'></TextInput>
        </View>
        <View>
          <Text style={{color:"white"}}>Descripcion: </Text>
          <TextInput style={styles.form_input} value={fromHabitos.descripcion} onChangeText={text=>setfromHabitos({...fromHabitos,descripcion:text})} placeholder='descripcion'></TextInput>
        </View>
        <View>
          <Text style={{color:"white"}}>Seleccionar frecuencia: </Text>
          <View style={styles.form_selec}>
            <Picker selectedValue={fromHabitos.frecuencia} onValueChange={value=>setfromHabitos({...fromHabitos,frecuencia:value})}>
            <Picker.Item label='diario' value="diario"></Picker.Item>
            <Picker.Item label='semanal' value='semanal'></Picker.Item>
            <Picker.Item label='mensual' value='mensual'></Picker.Item>
          </Picker>
          </View>
        </View>
        <View style={styles.btn_enviar}>
          <Pressable onPress={CreateHabito}>
            <Text style={{textAlign:'center',color:"white"}}>Crear Habito</Text>
          </Pressable>
        </View>
        </View>
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
  form_input:{
    color:"white",
    backgroundColor:"#4b4b4b",
    borderStyle:'solid',
    borderWidth:2,
    borderColor:'#4b4b4b',
    borderRadius:5,
    width:'100%',
    marginTop:5,
    marginBottom:5,    
  },
  form_selec:{
    color:"white",
    borderStyle:'solid',
    borderWidth:2,    
    backgroundColor:"#4b4b4b",
    borderColor:'#4b4b4b',
    borderRadius:5,    
  },
  btn_enviar:{
    marginTop:20,
    alignContent:'center',
    justifyContent:'center',
    borderRadius:10,
    padding:5,    
    borderColor:'#4b4b4b',
    borderStyle:'solid',
    borderWidth:2
  }
})