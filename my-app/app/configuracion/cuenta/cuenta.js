import { Stack } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { IconSafe, IconUser } from '../../../assets/Icons'

export default function Cuenta() {
  return (
    <>
    <ScrollView style={{backgroundColor:"#131313"}}>
    <Stack.Screen options={{headerTitle:"Tu cuenta",headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
    <View>
       <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconUser color='white'></IconUser>
            </View>
            <View style={styles.contenedor_info}>                
                <Text style={{color:"white"}}>Informacion de la cuenta</Text>
                <Text style={{color:"white"}}>Consulta la informacion de la cuenta, 
                    como el numero de telefono y la dirreccion de correo electronico</Text>
            </View>
       </View>
        <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconSafe color='white'></IconSafe>
            </View>
            <View style={styles.contenedor_info}>                
                <Text style={{color:"white"}}>Cambia tu contraseña</Text>
                <Text style={{color:"white"}}>Cambia tu contraseña en cualquier momento</Text>
            </View>
       </View>
    </View>
    </ScrollView>
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
