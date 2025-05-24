import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import axios from 'axios'
import constantes from "expo-constants"
export default function DetalleUser() {
  const {id}=useLocalSearchParams()
  const {user}=useUser()
  const host=constantes.expoConfig.extra.host 
  const [formUsuarios, setformUsuarios] = useState({
    imagen:'',
    nombre:'',
    apellido:'',
    telefono:'',
    correo:'',
    pass:''
  })
  const ShowUser=async()=>{
    try{
        const {data}=await axios.get(`http://${host}:4000/usuarios/s/${id}`,formUsuarios)
        setformUsuarios({
          imagen:data.imagen,
          nombre:data.nombre,
          apellido:data.apellido,
          telefono:data.telefono,
          correo:data.correo,
          pass:data.pass
        })
    }catch(err){
      alert("Hubo un error"+err.message)
    }

  }
  useEffect(()=>{
    ShowUser()
  },[]) 
  //Crear la funcion Update
    return (
    <>
    <View className='m-4'> 
        <View>
        <Text className='font-black text-xl'>Actualizar Perfil </Text>
    </View>
    <View>
      <Text>Nombre</Text>
      <TextInput style={styles.form_input} value={formUsuarios.nombre} onChangeText={text=>setformUsuarios({...formUsuarios,nombre:text})}></TextInput>
    </View>
    <View>
      <Text>Apellido</Text>
      <TextInput style={styles.form_input} value={formUsuarios.apellido} onChangeText={text=>setformUsuarios({...formUsuarios,apellido:text})}></TextInput>
    </View>
    <View>
      <Text>Telefono</Text>
      <TextInput style={styles.form_input} value={formUsuarios.telefono} onChangeText={text=>setformUsuarios({...formUsuarios,telefono:text})}></TextInput>
    </View>
    <View>
      <Text>Correo</Text>
      <TextInput style={styles.form_input} value={formUsuarios.correo} onChangeText={text=>setformUsuarios({...formUsuarios,correo:text})}></TextInput>
    </View>
    <View>
      <Text>Contraseña</Text>
      <TextInput style={styles.form_input} value={formUsuarios.pass} onChangeText={text=>setformUsuarios({...formUsuarios,pass:text})}></TextInput>
    </View>
    <View style={{alignItems:'center'}}>
      <Pressable style={styles.btn_sub}>
        <Text>Actualizar Perfil</Text>
      </Pressable>
    </View>
    </View>
    </>
  )
}
const styles=StyleSheet.create({
  form_input:{
    borderRadius:10,
    borderColor:'black',
    borderWidth:2,
    borderStyle:'solid',
    width:'100%',
    padding:10,
    marginTop:10,
    marginBottom:10
  },
  btn_sub:{
    borderWidth:2,
    borderRadius:10,
    borderStyle:'solid',
    borderColor:'black',
    padding:10,
  }
})