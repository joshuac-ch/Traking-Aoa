import { Picker } from '@react-native-picker/picker'
import React,{useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import axios from 'axios'
import Constants from "expo-constants"
import { useUser } from '../../components/UserContext'
export default function create() {
  const {user}=useUser()
  const [FormMetas, setFormMetas] = useState({
    titulo:'d',
    descripcion:'d',
    usuario_id:user.id,
    proceso:1,
    fecha_limite:new Date(),
    meta_total:100
  })
  const EnviarDatos=async()=>{
    try{
      const host=Constants.expoConfig.extra.host
      await axios.post(`http://${host}:4000/metas/i`,FormMetas)
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
       <View>
        <Text>Crear Nueva Meta</Text>
       </View>
       <View>
        <View>
            <Text>Titulo:</Text>
            <TextInput onChangeText={text=>setFormMetas({...FormMetas,titulo:text})} value={FormMetas.titulo} placeholder='ingrese el nombre de su meta'></TextInput>
        </View>
        <View>
            <Text>Descripcion: </Text>
            <TextInput placeholder='ingrese mas detalles' value={FormMetas.descripcion} onChangeText={text=>setFormMetas({...FormMetas,descripcion:text})}></TextInput>
        </View>
        <View>
            <Text>Fecha Limite</Text>
            <Pressable onPress={mostrarSelectorFecha} style={{borderWidth:1,borderRadius:5,padding:10,marginTop:5}}>
                <Text>{FormMetas.fecha_limite.toLocaleDateString()}</Text>
            </Pressable>
        </View>
        <View>
          <Pressable onPress={EnviarDatos}>
            <Text>Enviar Datos</Text>
          </Pressable>
        </View>
       </View>
    </View>
  )
}
