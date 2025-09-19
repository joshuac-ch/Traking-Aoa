import React, { useState } from 'react'
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { IconElipsis, IconHeart, IconReply } from '../../../assets/Icons'
import GetImage from '../../../utils/GetImage'
import { Stack } from 'expo-router'
export default function ComponenteMetas({datasRutina,datosUser}) {
  const [imagenExpandida, setimagenExpandida] = useState(false)    
  const fecha_inicio=new Date(datasRutina.fecha_inicio)
  const fecha_final=new Date(datasRutina.fecha_limite)
  const hoy=new Date()
  const tiempo_total=fecha_final-fecha_inicio
  const tiempo_Acumulado=hoy-fecha_inicio
  const progreso=Math.min(tiempo_Acumulado/tiempo_total,1)
 
  //hacer un tipo recordatorio en aqui el componente meta que no sea publicacion sino algo como un logro 
  return (
    <ScrollView style={{backgroundColor:"#131313"}}>
        <Stack.Screen options={{title:`Meta`,headerStyle:{backgroundColor:"#131313"},headerTintColor:"white",contentStyle:"red"}}></Stack.Screen>
        <View style={styles.contenedor_principal}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
                <View style={{display:'flex',flexDirection:'row'}}>
                    <View >
                        <Image source={{uri:GetImage(datosUser.imagen)}} style={{width:60,height:60,borderRadius:10,marginRight:10}}></Image>
                    </View>
                    <View>
                        <Text style={{fontWeight:'bold',color:"white"}}>Creador</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginRight:20,color:"white"}}>{datosUser.nombre}</Text>
                            <Text style={{color:'#75706f'}}>{datasRutina.fecha_inicio?new Date(datasRutina.fecha_inicio).toLocaleDateString():""}</Text>
                        </View>
                        <Text style={{color:"white"}}>{datosUser.correo}</Text>
                    </View>        
                </View>
                <View>
                    <IconElipsis color='white'></IconElipsis>
                </View>
            </View>
            <View style={{padding:10}}>
                <View>
                    <Text style={{fontSize:15,fontWeight:"bold",color:"white"}}>Meta Actual: </Text>
                    <Text style={{color:"white"}}>{datasRutina.titulo}</Text>
                </View>
                 <View >                    
                    <Text style={{color:"white"}}>{datasRutina.descripcion}</Text>
                </View> 
            </View>
    
            <View >
                      
                <View>
                    <Pressable onPress={()=>setimagenExpandida(true)}>
                         <Image style={styles.imagen} source={{ uri: GetImage(datasRutina.imagen) }} />
                    </Pressable>
                    <Modal visible={imagenExpandida} animationType="fade">
                        <View style={styles.modal}>
                        <Pressable style={styles.zona} onPress={()=>setimagenExpandida(false)}>
                             <Image style={styles.imagen_expandida} source={{ uri: GetImage(datasRutina.imagen) }} />
                        </Pressable>
                        </View>                    
                    </Modal>        
                </View>
                <View style={{padding:10}}>
                    <View style={{backgroundColor:"white",width:"100%",height:10,borderRadius:20}}>
                        <View style={{backgroundColor:`${progreso<1?"#2196f3":"#db515e"}`,borderRadius:20,width:`${progreso*100}%`,height:10}}></View>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{color:"white",fontWeight:"bold"}}>{Math.round(0)}%</Text>
                        <Text style={{color:"white",fontWeight:"bold"}}>{Math.round(progreso*100)}%</Text>
                    </View>
                </View>
                <View >
                    <View style={{alignSelf:"center"}}>
                        <Text style={{paddingBottom:10,fontSize:15,color:"white"}}>Lo cumples en <Text style={{fontWeight:"bold"}}>{new Date(tiempo_total).getDate()}</Text> dia(s)</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                        <View style={styles.fecha_propuesta}>
                            <Text style={{fontSize:25,color:"white"}}>{fecha_final.getDate()}</Text>
                        </View>
                        <View style={styles.fecha_propuesta}>
                            <Text style={{fontSize:25,color:"white"}}>{fecha_final.getMonth()}</Text>
                        </View>                        
                        <View style={styles.fecha_propuesta}>
                            <Text style={{fontSize:25,color:"white"}}>{fecha_final.getFullYear()}</Text>
                        </View>
                    </View>
                </View>
                {/*
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
                */}
                
            </View>
        </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    fecha_propuesta:{
        
        justifyContent:"center",
        alignItems:"center",
        textAlignVertical:"center",
        borderRadius:20,
        marginLeft:5,
        marginRight:5,
        backgroundColor:"#4d4c4d",
        width:100,
        height:60             
    },
    contenedor_principal:{
        margin:20,
        paddingBottom:10,
        
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
