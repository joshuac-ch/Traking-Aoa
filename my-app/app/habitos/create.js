import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import axios from 'axios'
import Constants from "expo-constants"
import { Stack, useRouter } from 'expo-router'
export default function create() {
  const {user}=useUser()
  const navegar=useRouter()
  const [fromHabitos, setfromHabitos] = useState({
    titulo:'',
    descripcion:'',
    frecuencia:'',   
    activo:1,
    usuario_id:user.id
  }) 
  const CreateHabito=async()=>{
    try{
      const local=Constants.expoConfig.extra.host
      await axios.post(`http://${local}:4000/habitos/c`,fromHabitos)
      alert("Se enviaron los datos  correctamente")
      navegar.push("/Panel")
    }catch(err){
      alert(err.message)
    }
  }
  return (
    <View>
      <Stack.Screen options={{title:'Crear Habitos'}}></Stack.Screen>
        <Text>Crear habito</Text>
        <View>
          <Text>Titulo: </Text>
          <TextInput value={fromHabitos.titulo} onChangeText={text=>setfromHabitos({...fromHabitos,titulo:text})} placeholder='ingrese titulo'></TextInput>
        </View>
        <View>
          <Text>Descripcion: </Text>
          <TextInput value={fromHabitos.descripcion} onChangeText={text=>setfromHabitos({...fromHabitos,descripcion:text})} placeholder='descripcion'></TextInput>
        </View>
        <View>
          <Picker selectedValue={fromHabitos.frecuencia} onValueChange={value=>setfromHabitos({...fromHabitos,frecuencia:value})}>
            <Picker.Item label='diario' value="Diario"></Picker.Item>
            <Picker.Item label='semanal' value='Semanal'></Picker.Item>
            <Picker.Item label='Mensual' value='Mensual'></Picker.Item>
          </Picker>
        </View>
        <View>
          <Pressable onPress={CreateHabito}>
            <Text>Crear Habito</Text>
          </Pressable>
        </View>
    </View>
  )
}
