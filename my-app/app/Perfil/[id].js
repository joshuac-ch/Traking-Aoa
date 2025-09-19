import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import axios from 'axios'
import constantes from "expo-constants"
import * as ImagePicker from 'expo-image-picker';
import GetImage from '../../utils/GetImage'
import getHost from '../../hooks/getHost'

export default function DetalleUser() {
  const {id}=useLocalSearchParams()
  const {user}=useUser()
  const host=getHost()
  const [formUsuarios, setformUsuarios] = useState({
    imagen:'',
    nombre:'',
    apellido:'',
    telefono:'',
    correo:'',
    pass:'',
    des:''
  })
  const ShowUser=async()=>{
    try{
        const {data}=await axios.get(`http://${host}:4000/usuarios/s/${id}`,formUsuarios)
        setformUsuarios({
          imagen:GetImage(data.imagen),
          nombre:data.nombre,
          apellido:data.apellido,
          telefono:data.telefono,
          correo:data.correo,
          pass:data.pass,
          des:data.des
        })
    }catch(err){
      alert("Hubo un error"+err.message)
    }

  }
  useFocusEffect(
    useCallback(()=>{
      ShowUser()       
  },[]) 
  )  
    
  const navegar=useRouter()
  //Crear la funcion Update
    const updatePofile=async()=>{      
      try{
        let imageUrl=""
        if(formUsuarios.imagen.startsWith("file://")){
          const newData=new FormData()
          newData.append("imagen",{
            
            uri:formUsuarios.imagen,
            name:"update-perfil.jpg",
            type:"image/jpeg"
          })
        const response=await axios.post(`http://${host}:4000/upload`,newData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        })
        imageUrl=response.data.url  
        }else{
          imageUrl=formUsuarios.imagen
        }
        await axios.put(`http://${host}:4000/usuarios/u/${id}`,{...formUsuarios,imagen:imageUrl})
        alert("Se actualizaron los datos")
        //navegar.push("/Panel")
      }catch(err){
        alert("Hubo un error: "+err.message)
      }
    }

   const pickImage=async()=>{
    let result=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images','videos'],
      allowsEditing:true,
      aspect:[4,3],
      quality:1
    })
    
    if(!result.canceled){
      setformUsuarios({...formUsuarios,imagen:result.assets[0].uri})
    }
   
   } 
    return (
    <>
    <Stack.Screen options={{title:`Editar Perfil`,headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
    <ScrollView style={{backgroundColor:"#131313"}}>
      <View className='m-4' style={{marginBottom:50,marginTop:20}}> 
        <View>
        <Text className='font-black text-xl' style={{color:"white"}}>Actualizar Perfil </Text>
    </View>
    <View>
      {formUsuarios.imagen&&
      <Image style={styles.img_form} source={{uri:formUsuarios.imagen}}></Image> 
      }
     
    </View>
    <View>
      <Pressable onPress={pickImage} style={{backgroundColor:"#252525",padding:10,borderRadius:10,width:150,alignSelf:"center"}}>
        <Text style={{color:"white",textAlign:"center"}}>Seleccionar Imagen</Text>
      </Pressable>
     
      
    </View>
    <View>
      <Text style={{color:"white"}}>Descripcion</Text>
      <TextInput style={styles.form_input} onChangeText={text=>setformUsuarios({...formUsuarios,des:text})} value={formUsuarios.des} placeholder='ingrese su descripcion de perfil'></TextInput>
    </View>
    <View>
      <Text style={{color:"white"}}>Nombre</Text>
      <TextInput style={styles.form_input} value={formUsuarios.nombre} onChangeText={text=>setformUsuarios({...formUsuarios,nombre:text})}></TextInput>
    </View>
    <View>
      <Text style={{color:"white"}}>Apellido</Text>
      <TextInput style={styles.form_input} value={formUsuarios.apellido} onChangeText={text=>setformUsuarios({...formUsuarios,apellido:text})}></TextInput>
    </View>
    <View>
      <Text style={{color:"white"}}>Telefono</Text>
      <TextInput style={styles.form_input} value={formUsuarios.telefono} onChangeText={text=>setformUsuarios({...formUsuarios,telefono:text})}></TextInput>
    </View>
    <View>
      <Text style={{color:"white"}}>Correo</Text>
      <TextInput style={styles.form_input} value={formUsuarios.correo} onChangeText={text=>setformUsuarios({...formUsuarios,correo:text})}></TextInput>
    </View>
    <View>
      <Text style={{color:"white"}}>Contraseña</Text>
      <TextInput style={styles.form_input} value={formUsuarios.pass} onChangeText={text=>setformUsuarios({...formUsuarios,pass:text})}></TextInput>
    </View>
    <View style={{alignItems:'center'}}>
      <Pressable onPress={()=>updatePofile()} style={styles.btn_sub}>
        <Text style={{color:"white"}}>Actualizar Perfil</Text>
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
    borderRadius:10,
    borderColor:'#4d4d4d',
    borderWidth:2,
    borderStyle:'solid',
    width:'100%',
    padding:10,
    marginTop:10,
    marginBottom:10
  },
  img_form:{
    alignSelf:'center',
    marginBottom:10,
    
    borderWidth:2,
    borderColor:'black',
    borderStyle:'solid',
    padding:10,
    borderRadius:50,
    width:100,
    height:100,
  },
  btn_sub:{
    borderWidth:2,
    borderRadius:10,
    borderStyle:'solid',
    borderColor:'#4d4d4d',
    padding:10,
  }
})