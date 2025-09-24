import { Stack, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View,Text,TextInput, Pressable, Button, Image, StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import constantes from 'expo-constants'
import axios from 'axios'
import * as PickerImage from "expo-image-picker"
import getHost from '../../hooks/getHost'
export default function create() {
  const navegar=useRouter()
  const [userDataForm, setuserDataForm] = useState({
    imagen:'',
    nombre:'',
    apellido:'',
    correo:'',
    telefono:'',
    pass:''    
  })
  const host=getHost()
  const InsertUser = async () => {
  try {
    let imageUrl = "";
    
    // 1. Subir imagen si hay una seleccionada
    if (userDataForm.imagen.startsWith("file://")) {
      const NewData = new FormData();
      NewData.append("imagen", {
        uri: userDataForm.imagen,
        name: "foto.jpg",
        type: "image/jpeg",
      });

      const response = await axios.post(`http://${host}:4000/upload`, NewData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      imageUrl = response.data.url;
     } else {
      imageUrl = userDataForm.imagen; // por si ya es una URL (por edición, por ejemplo)
    }

    // 2. Enviar datos del usuario con la URL de imagen
    await axios.post(`http://${host}:4000/usuarios/c`, {
      ...userDataForm,
      imagen: imageUrl,
    });
    ToastAndroid.show("Usuario Registrado!!",ToastAndroid.BOTTOM)
    navegar.replace("/Panel")
  } catch (err) {
    ToastAndroid.show("Llene todos los campos",ToastAndroid.BOTTOM)
    
  }
};

  const AddImage = async () => {
    let permissionResult = await PickerImage.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
            alert("Se necesita permiso para acceder a la galería.");
            return;
            }
  let result = await PickerImage.launchImageLibraryAsync({
    mediaTypes: PickerImage.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    // Solo guardar la URI local de la imagen, NO subir aún
    const localUri = result.assets[0].uri;
    setuserDataForm((prev) => ({
      ...prev,
      imagen: localUri
    }));
  }
};
  //paso sigueinte rellenar con datos flasos sobre la app
    return (
    <>
    <Stack.Screen options={{title:'Crear Perfil',headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
    <ScrollView style={{backgroundColor:"#131313"}}>
      <View style={{padding:10}}>
        <View>
            <Text style={{color:"white"}}>Foto: </Text>
            {userDataForm.imagen&&(
                <Image style={styles.image} source={{uri:userDataForm.imagen}}></Image>
            )}
            

        </View>
        
        <Pressable onPress={AddImage} style={{backgroundColor:"#252525",padding:10,borderRadius:10,width:150,alignSelf:"center"}}>
                <Text style={{color:"white",textAlign:"center"}}>Agregar Imagen</Text>
         </Pressable>
        <View>
            <Text style={{color:"white"}}>Nombre: </Text>
            <TextInput style={styles.input_form} onChangeText={text=>setuserDataForm({...userDataForm,nombre:text})} value={userDataForm.nombre} placeholder='ingrese nombre'></TextInput>
        </View>
        <View>
            <Text style={{color:"white"}}>Apellido: </Text>
            <TextInput style={styles.input_form} placeholder='ingrese apellido' onChangeText={text=>setuserDataForm({...userDataForm,apellido:text})} value={userDataForm.apellido}></TextInput>
        </View>
        <View>
            <Text style={{color:"white"}}>Telefono: </Text>
            <TextInput style={styles.input_form} onChangeText={text=>setuserDataForm({...userDataForm,telefono:text})} value={userDataForm.telefono} placeholder='ingrese telefono'></TextInput>
        </View>
        <View>
            <Text style={{color:"white"}}>Correo: </Text>
            <TextInput style={styles.input_form} placeholder='ingrese correo electronico' onChangeText={text=>setuserDataForm({...userDataForm,correo:text})} value={userDataForm.correo}></TextInput>
        </View>
        <View>
            <Text style={{color:"white"}}>Contraseña: </Text>
            <TextInput style={styles.input_form} placeholder='ingrese contraseña segura' onChangeText={text=>setuserDataForm({...userDataForm,pass:text})} value={userDataForm.pass}></TextInput>
        </View>
        <View style={{marginBottom:30}}>
            <Pressable style={styles.registrar} onPress={InsertUser}>
                <Text style={{textAlign:'center',color:'white'}}>Registrarse</Text>
            </Pressable>
        </View>
        
    </View>
    </ScrollView>
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
        color:"white",
        padding:10,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'#141414',
        backgroundColor:"#4b4b4b",
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
        backgroundColor:'#252525',       
        padding:10,
        marginTop:10,
        alignSelf:'center',
        width:100
    }    
})
