import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { IconBack } from '../assets/Icons'
import { Link } from 'expo-router'


export default function ListaFollos({user,lista}) {
  return (
    <>
        <View style={{margin:10}}>
            
            {lista.length>0?
                lista.map((m,i)=>{
                    return(
                       <Link key={i} href={`/Perfil/users/${m.creador.id}`} asChild>
                        <Pressable>
                          <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
                             <View>
                                 <Image source={{uri:m.creador.imagen}} style={{height:50,width:50,borderRadius:50,marginRight:10}}></Image>    
                             </View>                        
                             <View>
                                 <Text>{m.creador.nombre}</Text>
                                 <Text>{m.creador.correo}</Text>
                             </View>
                         </View>
                        </Pressable>
                       </Link>
                        )   
                })
                :<Text>No hay usuarios</Text>
            }
        </View>   
    </>
  )
}
