import { Picker } from '@react-native-picker/picker'
import React,{useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import axios from 'axios'
import Constants from "expo-constants"
import { useUser } from '../../components/UserContext'
import { Stack, useRouter } from 'expo-router'
import * as ImagePicker from "expo-image-picker"
import getHost from '../../hooks/getHost'
export default function Create() {
  const {user}=useUser()
  const [FormMetas, setFormMetas] = useState({
    imagen:'',
    titulo:'',
    descripcion:'',
    usuario_id:user.id,
    proceso:0,
    fecha_limite:new Date(),
    meta_total:100
  })
  const navegar=useRouter()
  const EnviarDatos=async()=>{
    try{      
      const host=getHost()
      await axios.post(`http://${host}:4000/metas/i`,FormMetas)      
      ToastAndroid.show("Se creo la meta",ToastAndroid.BOTTOM)
      navegar.replace("/Panel")
    }catch(err){
      ToastAndroid.show("Llenne todos los campos",ToastAndroid.BOTTOM)      
    }
  }
  
  const mostrarSelectorFecha=()=>{
    DateTimePickerAndroid.open({
        value:FormMetas.fecha_limite,
        onChange:(_,SelectedDate)=>{//puedes usar _ para event 
            if(SelectedDate){
                setFormMetas({...FormMetas,fecha_limite:SelectedDate})
            }
        },
        mode:'date',
        is24Hour:true
    })
  }
    return (
      <ScrollView style={{backgroundColor:"#131313"}}>
    <View>
      <Stack.Screen options={{title:'Crear Metas',headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
       <View style={{margin:15}}>
        <View>
        <Text style={{color:"white"}}>Crear Nueva Meta</Text>
       </View>
       <View>
        <View>
          <Text style={{color:"white"}}>Imagen</Text>
          <TextInput style={styles.form_input} value={FormMetas.imagen} onChangeText={text=>setFormMetas({...FormMetas,imagen:text})} placeholder='ingrese link' ></TextInput>
        </View>
        
        <View>
            <Text style={{color:"white"}}>Titulo:</Text>
            <TextInput style={styles.form_input} onChangeText={text=>setFormMetas({...FormMetas,titulo:text})} value={FormMetas.titulo} placeholder='ingrese el nombre de su meta'></TextInput>
        </View>
        <View>
            <Text style={{color:"white"}}>Descripcion: </Text>
            <TextInput style={styles.form_input} placeholder='ingrese mas detalles' value={FormMetas.descripcion} onChangeText={text=>setFormMetas({...FormMetas,descripcion:text})}></TextInput>
        </View>
        <View>
            <Text style={{color:"white"}}>Fecha Limite: </Text>
            <Pressable onPress={mostrarSelectorFecha} style={{borderWidth:2,borderRadius:5,borderColor:"#4b4b4b",padding:10,marginTop:5,backgroundColor:"#4b4b4b"}}>
                <Text style={{color:"white"}}>{FormMetas.fecha_limite.toLocaleDateString()}</Text>
            </Pressable>
        </View>
        <View  style={{alignItems:'center'}}>
          <Pressable style={styles.btn_enmviar} onPress={EnviarDatos}>
            <Text  style={{textAlign:'center',color:"white"}}>Enviar Datos</Text>
          </Pressable>
        </View>
       </View>       
       </View>
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
  btn_enmviar:{
    color:"white",
    borderRadius:20,
    width:200,
    borderWidth:2,
    padding:10,
    marginTop:20,
    borderStyle:'solid',
    borderColor:'#4b4b4b'  

  },
  img:{
    width:200,
    height:100,
    borderRadius:10
  },
  form_input:{
    borderWidth:2,
    backgroundColor:"#4b4b4b",
    color:"white",
    borderStyle:'solid',
    borderColor:'#4b4b4b',
    padding:10,
    width:'100%',
    borderRadius:5
  }
})