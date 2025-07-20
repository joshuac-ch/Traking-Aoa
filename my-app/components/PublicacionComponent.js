import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IconElipsis, IconHeart, IconReply } from '../assets/Icons'
import Comentario from './Comentario'

export default function PublicacionComponent({datosUser,datasRutina,publicacionID}) {
  return (
    <View style={styles.contenedor_principal}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
            <View style={{display:'flex',flexDirection:'row'}}>
        <View >
            <Image source={{uri:datosUser.imagen}} style={{width:60,height:60,borderRadius:10,marginRight:10}}></Image>
        </View>
        <View>
            <Text style={{fontWeight:'bold'}}>Creador</Text>
            <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:20}}>{datosUser.nombre}</Text>
                <Text style={{color:'#75706f'}}>{datasRutina.fecha_inicio?new Date(datasRutina.fecha_inicio).toLocaleDateString():""}</Text>
            </View>
            <Text>{datosUser.correo}</Text>
        </View>        
       </View>
       <View>
        <IconElipsis></IconElipsis>
       </View>
        </View>
    
       <View >
         <View style={{padding:10}}>
            <Text>{datasRutina.titulo}</Text>
            <Text>{datasRutina.descripcion}</Text>
        </View>        
        <View>
            <Image style={styles.imagen} source={{uri:datasRutina.imagen}}></Image>
        </View>
        <View style={{flexDirection:"row",justifyContent:'space-around',alignItems:'center'}}>
            <View  style={{flexDirection:'row',margin:10,alignItems:'center'}}>
                <IconHeart></IconHeart>
                <Text style={{marginLeft:10}}>Love</Text>
            </View>
            <View style={{flexDirection:'row',margin:10,alignItems:'center'}}>
                <IconReply></IconReply>
                <Text style={{marginLeft:10}}>Compartir</Text>
            </View>

        </View>
       <View>
        <Comentario pubID={publicacionID}></Comentario>
       </View>
       </View>
    </View>
  )
}
const styles=StyleSheet.create({
    contenedor_principal:{
        margin:20,
        
        backgroundColor:"white",
        borderRadius:20,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:"transparent"
    },
    imagen:{
        margin:10,
        width:150,
        height:200,
        alignSelf:'center',
        borderRadius:20,        
    }
})