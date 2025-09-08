import axios from 'axios'
import React, { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { Text } from 'react-native'
import { useUser } from '../../components/UserContext'
import Constants from "expo-constants"
import { Stack } from 'expo-router'
import getHost from '../../hooks/getHost'
export default function Create() {
    const host=getHost() //No dejar espacios en blancko en el Host
    const {user}=useUser()
    const [DataForm, setDataForm] = useState({
        usuario_id:user.id,
        imagen:'',        
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
            alert("Debe llenar todos los campos")
        }
    }
    return (
    <>
    <Stack.Screen options={{title:'Crear Actividad'}}></Stack.Screen>
   <ScrollView>
    <View className='m-4'>
    <View>
        <Text>Imagen</Text>
        <TextInput style={styles.form_input} onChangeText={text=>setDataForm({...DataForm,imagen:text})} value={DataForm.imagen} placeholder='ingrese link de imagen'></TextInput>
    </View>
     <View>
        <Text>Ingrese el titulo</Text>
        <TextInput style={styles.form_input} onChangeText={text=>setDataForm({...DataForm,titulo:text})} value={DataForm.titulo} placeholder='Titulo...'></TextInput>    
    </View>
     <View>
        <Text>Descipcion</Text>
        <TextInput style={styles.form_input} onChangeText={text=>setDataForm({...DataForm,descripcion:text})} value={DataForm.descripcion} placeholder='Descripcion...'></TextInput>    
    </View >
    <View style={{alignItems:'center'}}>
        <Pressable style={styles.btn_sub} onPress={EnviarDatos}>
        <Text style={{textAlign:'center'}}>Crear Actividad</Text>
    </Pressable>
    </View>
   </View>
   </ScrollView>
    </>
  )
}
const styles=StyleSheet.create({
    form_input:{
        borderWidth:2,
        borderStyle:'solid',
        borderColor:' black',
        borderRadius:10,
        padding:10,
        width:'100%',
        marginTop:10,
    },
    btn_sub:{
        borderStyle:'black',
        borderWidth:2,
         borderColor:'black',
         borderRadius:10,
         marginTop:10,
         padding:10,        
         width:150,
    }
})
