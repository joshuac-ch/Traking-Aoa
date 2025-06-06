import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { IconSafe, IconUser } from '../../assets/Icons'

export default function index() {
  return (
    <>
    <Stack.Screen options={{headerTitle:"Configuacion"}}></Stack.Screen>
    <View>      
        <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconUser></IconUser>
            </View>
            <View style={styles.contenedor_info}>                
               <Link href={"/configuracion/cuenta/cuenta"} asChild>
                    <Pressable>
                        <Text>Tu cuenta</Text>
                        <Text>Consulta Informacion de tu cuenta</Text>
                    </Pressable>
               </Link>
            </View>
       </View>
        <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconSafe></IconSafe>
            </View>
            <View style={styles.contenedor_info}>                
               <Link href={"/configuracion/cuenta/cuenta"} asChild>
                    <Pressable>
                        <Text>Seguridad</Text>
                        <Text>agregar funciones de seguridad</Text>
                    </Pressable>
               </Link>
            </View>
       </View>
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    contenedor:{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    contenedor_icon:{
        padding:10
    },
    contenedor_info:{
       width:350     
    }
})
