import { Picker } from '@react-native-picker/picker'
import React,{useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import axios from 'axios'
import Constants from "expo-constants"
import { useUser } from '../../components/UserContext'
import { Stack } from 'expo-router'
import * as ImagePicker from "expo-image-picker"
export default function create() {
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
  const EnviarDatos=async()=>{
    try{
      const host=Constants.expoConfig.extra.host
      await axios.post(`http://${host}:4000/metas/i`,FormMetas)
      console.log(FormMetas)
      alert("Se creo el habito")

    }catch(err){
      alert(err.message)
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
    <View>
      <Stack.Screen options={{title:'Crear Metas'}}></Stack.Screen>
       <View className='m-4'>
        <View>
        <Text>Crear Nueva Meta</Text>
       </View>
       <View>
        <View>
          <Text>Imagen</Text>
          <TextInput style={styles.form_input} value={FormMetas.imagen} onChangeText={text=>setFormMetas({...FormMetas,imagen:text})} placeholder='ingrese link' ></TextInput>
        </View>
        <View>
            <Text>Titulo:</Text>
            <TextInput style={styles.form_input} onChangeText={text=>setFormMetas({...FormMetas,titulo:text})} value={FormMetas.titulo} placeholder='ingrese el nombre de su meta'></TextInput>
        </View>
        <View>
            <Text>Descripcion: </Text>
            <TextInput style={styles.form_input} placeholder='ingrese mas detalles' value={FormMetas.descripcion} onChangeText={text=>setFormMetas({...FormMetas,descripcion:text})}></TextInput>
        </View>
        <View>
            <Text>Fecha Limite: </Text>
            <Pressable onPress={mostrarSelectorFecha} style={{borderWidth:1,borderRadius:5,padding:10,marginTop:5}}>
                <Text>{FormMetas.fecha_limite.toLocaleDateString()}</Text>
            </Pressable>
        </View>
        <View  style={{alignItems:'center'}}>
          <Pressable style={styles.btn_enmviar} onPress={EnviarDatos}>
            <Text  style={{textAlign:'center'}}>Enviar Datos</Text>
          </Pressable>
        </View>
       </View>       
       </View>
    </View>
  )
}
const styles=StyleSheet.create({
  btn_enmviar:{
    borderRadius:20,
    width:200,
    borderWidth:2,
    padding:10,
    marginTop:20,
    borderStyle:'solid',
    borderColor:'black'  

  },
  img:{
    width:200,
    height:100,
    borderRadius:10
  },
  form_input:{
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'black',
    padding:10,
    width:'100%',
    borderRadius:5
  }
})