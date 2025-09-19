import React, { useState } from 'react'
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { IconElipsis, IconHeart, IconReply } from '../assets/Icons'
import Comentario from './Comentario'
import GetImage from '../utils/GetImage'
import { Link } from 'expo-router'
export default function PublicacionComponent({datosUser,datasRutina,publicacionID}) {
  const [imagenExpandida, setimagenExpandida] = useState(false)    
  return (
    <ScrollView style={{backgroundColor:"#131313"}}>
        <View style={styles.contenedor_principal}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
                <View style={{display:'flex',flexDirection:'row'}}>
                    <View >
                        <Link style={{marginRight:10}} href={`/Perfil/users/${datosUser.id}`}>
                        <Image source={{uri:GetImage(datosUser.imagen)}} style={{width:60,height:60,borderRadius:10,marginRight:10}}></Image>
                        </Link>
                    </View>
                    <View>
                        <Text style={{fontWeight:'bold',color:"white"}}>Creador</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginRight:20,color:"white"}}>{datosUser.nombre}</Text>
                            <Text style={{color:'#75706f'}}>{datasRutina.fecha?new Date(datasRutina.fecha).toLocaleDateString():""}</Text>
                        </View>
                        <Text style={{ color:"white"}}>{datosUser.correo}</Text>
                    </View>        
                </View>
                <View>
                    <IconElipsis color='white'></IconElipsis>
                </View>
            </View>
    
            <View >
                <View style={{padding:10}}>
                    <Text style={{color:"white"}}>{datasRutina.titulo}</Text>
                    <Text style={{color:"white"}}>{datasRutina.descripcion}</Text>
                </View>        
                <View>
                    <Pressable onPress={()=>setimagenExpandida(true)}>
                         <Image style={styles.imagen} source={{ uri: GetImage(datasRutina.imagen) }} />
                    </Pressable>
                    <Modal visible={imagenExpandida} animationType="fade">
                        <View style={styles.modal}>
                        <Pressable style={styles.zona} onPress={()=>setimagenExpandida(false)}>
                             <Image style={styles.imagen_expandida} source={{ uri:GetImage(datasRutina.imagen) }} />
                        </Pressable>
                        </View>                    
                    </Modal>             
                
               
                </View>
                <View style={{flexDirection:"row",justifyContent:'space-around',alignItems:'center'}}>
                    <View  style={{flexDirection:'row',margin:10,alignItems:'center'}}>
                        <IconHeart color='white'></IconHeart>
                        <Text style={{marginLeft:10,color:"white"}}>Love</Text>
                    </View>
                    <View style={{flexDirection:'row',margin:10,alignItems:'center'}}>
                        <IconReply color='white'></IconReply>
                        <Text style={{color:"white",marginLeft:10}}>Compartir</Text>
                    </View>
                </View>
                <View>
                    <Comentario pubID={publicacionID}></Comentario>
                </View>
            </View>
        </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    contenedor_principal:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        marginBottom:40,
        backgroundColor:"#252525",
        borderRadius:20,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:"transparent"
    },
    zona:{
       flex:1,
    },
    modal:{
        flex:1,
        backgroundColor:"black",
    },
    imagen:{
        margin:10,
        width:250,
        height:300,
        alignSelf:'center',
        borderRadius:20,        
    },
    imagen_expandida:{
        width:"100%",
        height:"100%",
        resizeMode:"contain"
    },
})