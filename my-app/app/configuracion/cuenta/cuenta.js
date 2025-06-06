import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconSafe, IconUser } from '../../../assets/Icons'

export default function Cuenta() {
  return (
    <>
    <Stack.Screen options={{headerTitle:"Tu cuenta"}}></Stack.Screen>
    <View>
       <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconUser></IconUser>
            </View>
            <View style={styles.contenedor_info}>                
                <Text>Informacion de la cuenta</Text>
                <Text>Consulta la informacion de la cuenta, 
                    como el numero de telefono y la dirreccion de correo electronico</Text>
            </View>
       </View>
        <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconSafe></IconSafe>
            </View>
            <View style={styles.contenedor_info}>                
                <Text>Cambia tu contraseña</Text>
                <Text>Cambia tu contraseña en cualquier momento</Text>
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
