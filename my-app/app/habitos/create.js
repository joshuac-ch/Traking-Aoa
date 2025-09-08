import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import axios from 'axios'
import Constants from "expo-constants"
import { Stack, useRouter } from 'expo-router'
import getHost from '../../hooks/getHost'
export default function create() {
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
    <View>
      <Stack.Screen options={{title:'Crear Habitos'}}></Stack.Screen>
        
        <View className='m-4'>
          <View>
          <Text>Imagen: </Text>
          <TextInput style={styles.form_input} value={fromHabitos.imagen} onChangeText={text=>setfromHabitos({...fromHabitos,imagen:text})} placeholder='ingrese link de imagen'></TextInput>
        </View>
        <View>
          <Text>Titulo: </Text>
          <TextInput style={styles.form_input} value={fromHabitos.titulo} onChangeText={text=>setfromHabitos({...fromHabitos,titulo:text})} placeholder='ingrese titulo'></TextInput>
        </View>
        <View>
          <Text>Descripcion: </Text>
          <TextInput style={styles.form_input} value={fromHabitos.descripcion} onChangeText={text=>setfromHabitos({...fromHabitos,descripcion:text})} placeholder='descripcion'></TextInput>
        </View>
        <View>
          <Text>Seleccionar frecuencia: </Text>
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
            <Text style={{textAlign:'center'}}>Crear Habito</Text>
          </Pressable>
        </View>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
  form_input:{
    borderStyle:'solid',
    borderWidth:2,
    borderColor:'black',
    borderRadius:5,
    width:'100%',
    marginTop:5,
    marginBottom:5,    
  },
  form_selec:{
    borderStyle:'solid',
    borderWidth:2,
    borderColor:'black',
    borderRadius:5,    
  },
  btn_enviar:{
    marginTop:20,
    alignContent:'center',
    justifyContent:'center',
    borderRadius:10,
    padding:5,    
    borderColor:'black',
    borderStyle:'solid',
    borderWidth:2
  }
})