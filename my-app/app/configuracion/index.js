import { Link, router, Stack, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { IconLogin, IconSafe, IconUser } from '../../assets/Icons'
import { useUser } from '../../components/UserContext'

export default function Index() {
 const navegar=useRouter()
 const {user,setUser}=useUser()
  
 const logOut=()=>{
    setUser("")
 }
    return (
    <>
    <Stack.Screen options={{headerTitle:"Configuacion",headerStyle:{backgroundColor:"#131313"},headerTintColor:"white"}}></Stack.Screen>
    <ScrollView style={{backgroundColor:"#131313"}}>
    <View>      
        <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconUser color='white'></IconUser>
            </View>
            <View style={styles.contenedor_info}>                
               <Link href={"/configuracion/cuenta/cuenta"} asChild>
                    <Pressable>
                        <Text style={{color:"white"}}>Tu cuenta</Text>
                        <Text style={{color:"white"}}>Consulta Informacion de tu cuenta</Text>
                    </Pressable>
               </Link>
            </View>
       </View>
        <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconSafe color='white'></IconSafe>
            </View>
            <View style={styles.contenedor_info}>                
               <Link href={"/configuracion/cuenta/cuenta"} asChild>
                    <Pressable>
                        <Text  style={{color:"white"}}>Seguridad</Text>
                        <Text  style={{color:"white"}}>agregar funciones de seguridad</Text>
                    </Pressable>
               </Link>
            </View>
       </View>
        <View style={styles.contenedor}>
            <View style={styles.contenedor_icon}>
                <IconLogin color='white'></IconLogin>
            </View>
            <View style={styles.contenedor_info}>              
                
                    <Pressable onPress={()=>{
                         logOut()
                         router.replace('/Login/app')}}>
                      <Text  style={{color:"white"}}>Cerrar Session</Text>
                    </Pressable>
                
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
