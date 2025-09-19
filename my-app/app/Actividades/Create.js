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
    <Stack.Screen options={{title:'Crear Actividad',headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
   <ScrollView style={{backgroundColor:"#131313"}}>
    <View className='m-4'>
    <View>
        <Text style={{color:"white"}}>Imagen</Text>
        <TextInput style={styles.form_input} onChangeText={text=>setDataForm({...DataForm,imagen:text})} value={DataForm.imagen} placeholder='ingrese link de imagen'></TextInput>
    </View>
     <View>
        <Text style={{color:"white"}}>Ingrese el titulo</Text>
        <TextInput style={styles.form_input} onChangeText={text=>setDataForm({...DataForm,titulo:text})} value={DataForm.titulo} placeholder='Titulo...'></TextInput>    
    </View>
     <View>
        <Text style={{color:"white"}}>Descipcion</Text>
        <TextInput style={styles.form_input} onChangeText={text=>setDataForm({...DataForm,descripcion:text})} value={DataForm.descripcion} placeholder='Descripcion...'></TextInput>    
    </View >
    <View style={{alignItems:'center'}}>
        <Pressable style={styles.btn_sub} onPress={EnviarDatos}>
        <Text style={{textAlign:'center',color:"white"}}>Crear Actividad</Text>
    </Pressable>
    </View>
   </View>
   </ScrollView>
    </>
  )
}
const styles=StyleSheet.create({
    form_input:{
        color:"white",
        borderWidth:2,
        backgroundColor:"#4b4b4b",
        borderStyle:'solid',
        borderColor:'#4b4b4b',
        borderRadius:10,
        padding:10,
        width:'100%',
        marginTop:10,
    },
    btn_sub:{
        borderStyle:'solid',
        borderWidth:2,
         borderColor:'#4b4b4b',
         borderRadius:10,
         marginTop:10,
         padding:10,        
         width:150,
    }
})
