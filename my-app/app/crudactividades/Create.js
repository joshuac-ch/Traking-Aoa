import axios from 'axios'
import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { Text } from 'react-native'
import { useUser } from '../../components/UserContext'
import Constants from "expo-constants"
export default function Create() {
    const host=Constants.expoConfig.extra.host; //No dejar espacios en blancko en el Host
    const {user}=useUser()
    const [DataForm, setDataForm] = useState({
        usuario_id:user.id,        
        titulo:'',
        descripcion:''
    })
    //const [titulo, settitulo] = useState('Toma agua')
    //const [descripcion, setdescripcion] = useState('')
    const EnviarDatos=async()=>{
        try{
            await axios.post(`http://${host}:4000/actividades/i`,DataForm)
            alert("Se enviaon los datos correctamente")
        }catch(err){
            alert(err.message)
        }
    }
    return (
    <>
   <View>
     <View>
        <Text>Ingrese el titulo</Text>
        <TextInput onChangeText={text=>setDataForm({...DataForm,titulo:text})} value={DataForm.titulo} placeholder='Titulo...'></TextInput>    
    </View>
     <View>
        <Text>Descipcion</Text>
        <TextInput onChangeText={text=>setDataForm({...DataForm,descripcion:text})} value={DataForm.descripcion} placeholder='Descripcion...'></TextInput>    
    </View>
    <Pressable onPress={EnviarDatos}>
        <Text>Crear Actividad</Text>
    </Pressable>
   </View>
    </>
  )
}
