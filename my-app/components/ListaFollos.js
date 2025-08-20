import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { IconBack, IconElipsis } from '../assets/Icons'
import { Link } from 'expo-router'
import GetImage from '../utils/GetImage'


export default function ListaFollos({user,lista,info}) {
  return (
    <>
        <View style={{margin:10}}>
            
            {lista.length>0?
                lista.map((m,i)=>{
                    return(
                       <Link key={i} href={`/Perfil/users/${m.creador.id}`} asChild>
                        <Pressable>
                          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:5,marginBottom:5}}>
                            <View style={{flexDirection:"row",maxWidth:220,width:220}}>
                                <View>
                                 <Image source={{uri:GetImage(m.creador.imagen)}} style={{height:50,width:50,borderRadius:50,marginRight:10}}></Image>    
                                </View>                        
                                <View>
                                    <Text>{m.creador.nombre}</Text>
                                    <Text>{m.creador.correo}</Text>
                                </View>
                            </View>
                            <View style={styles.boton_info}>
                                <Text style={{fontWeight:"bold"}}>{info}</Text>
                            </View>                            
                            <View>
                                <IconElipsis></IconElipsis>
                            </View>                             
                         </View>
                        </Pressable>
                       </Link>
                        )   
                })
                :<Text style={{textAlign:"center"}}>No hay seguidores</Text>
            }
        </View>   
    </>
  )
}
const styles=StyleSheet.create({
    boton_info:{
        borderRadius:50,
        borderWidth:2,
        borderColor:"transparend",
        backgroundColor:"#fff",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10
    }
})