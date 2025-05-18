import React, { use } from 'react'
import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../components/UserContext'

import PagerView from 'react-native-pager-view'
import { Link } from 'expo-router'
import { IconLeft } from '../assets/Icons'

export default function Panel() {
    const {user}=useUser()

  return (
      <ScrollView>
        
    <View className='flex flex-row justify-start items-center p-4 '>
        <Image style={styles.image} source={{uri:'https://i.pinimg.com/736x/ed/cf/77/edcf77a4d267cdabad9a04365ea19359.jpg'}}></Image>
        <View className="justify-center">
            <Text className="font-black">{user.nombre} {user.apellido}</Text>
            <Text >{user.correo}</Text>
        </View>
        
    </View>
   <View style={styles.contenedorCarrusel}>
      <PagerView style={{ flex: 1 }} initialPage={0}>
        <View key="1" style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={styles.imagenCarrusel} source={{uri:'https://i.pinimg.com/736x/48/5a/d2/485ad255cde385445e8ae312e1a99c97.jpg'}}></Image>
           <View style={styles.TextCarrusel}>
            <Text>Proyecto 1 Mision</Text>
          </View>
        </View>
        <View key="2" style={{justifyContent:'center',alignItems:'center'}} >
            <Image style={styles.imagenCarrusel} source={{uri:'https://i.pinimg.com/736x/d2/c4/d5/d2c4d52b69f3d40c38ed12aa9870c2c5.jpg'}}></Image>
          <View style={styles.TextCarrusel}>
            <Text>Proyecto 2 Mision</Text>
          </View>
        </View>
        <View key="3" style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={styles.imagenCarrusel} source={{uri:'https://i.pinimg.com/736x/c6/03/91/c60391cd96ba2d9b44c02276e1a96baf.jpg'}}></Image>
          <View style={styles.TextCarrusel}>
            <Text>Proyecto 3 Mision</Text>
          </View>
        </View>
      </PagerView>      
    </View>
    <View style={styles.vista_acti}>
      <Link href={"crudactividades/ActividadesDiarias"} asChild>
      <Pressable>
        <View style={styles.btn_router}>
          <IconLeft></IconLeft>
          <Text style={{marginLeft:10}}>Ir a actividades</Text>
        </View>
      </Pressable>
      </Link>
      <Link href={"/habitos"} asChild>
       <Pressable>
         <View style={styles.btn_router}>
            <IconLeft></IconLeft>
            <Text style={{marginLeft:10}}>Ir a habitos</Text>
         </View>
       </Pressable>
       </Link>
      <Link href={"/Metas/"} asChild>
        <Pressable>
             <View  style={styles.btn_router}>
                <IconLeft ></IconLeft>
                <Text style={{marginLeft:10}}>Ir a metas</Text>
            </View>
        </Pressable>
      </Link>
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    btn_router:{
      borderRadius:20,
      boxShadow:'0px 0px 8px 1px black',
      display:'flex',
      flexDirection:'row',
      margin:10,
      padding:5,
      
        
    }
    ,
    vista_acti:{
      paddingTop:15,      
      margin:20,
      padding:10
    },
    contenedorCarrusel:{
        alignSelf:'flex-start',
        display:'flex',
        justifyContent:'center',     
        height:150,
        width:250,        
        
    },
    TextCarrusel:{
      width:180,
      padding:10,
      borderWidth:2,
      borderStyle:'solid',
      backgroundColor:'white',
      borderBottomRightRadius:10,
      borderBottomLeftRadius:10,
      alignItems:'center',
      borderColor:'white'

    },
    imagenCarrusel:{
        borderColor:'white',        
        width:180,
        height:100,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderWidth:1,
        borderStyle:'solid',        
       
    },
    image:{
        borderRadius:20,
        height:50,
        width:50,
        margin:10
    }
})