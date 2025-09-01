import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import { Link, router, useFocusEffect } from 'expo-router'
import constantes from "expo-constants"
import { Pressable } from 'react-native'
import GetImage from '../../utils/GetImage'
import { IconLove } from '../../assets/Icons'
export default function Love() {
    const [dataLove, setdataLove] = useState([])
    const host=constantes.expoConfig.extra.host
    const {user}=useUser()     
    const ShowLovePost=async()=>{
        const {data}=await axios.get(`http://${host}:4000/seguidor/loves/${user.id}`)
        setdataLove(data)       
    }
    useFocusEffect(
        useCallback(()=>{
            if(user.id){
                ShowLovePost()
            }
        },[user.id])
    )
   //crear un boton para perfil editar qeu esta sobreponido y aho lo rediriha a user edit
   //al entrar al perfil que el miso usuario que creo sus publicaciones puede verlas hasta los comentarios   
   //en buscar implementar el params  
   //crear la nmotificacion comentarios sin seguidor
    
  return (
    <>
    <View>
        <View>
            <Text style={styles.tiulo_love}>My loves</Text>
        </View>
        {dataLove.length>0?
        <View style={{flexDirection:'row',justifyContent:'center',flexWrap:'wrap'}}>
        {dataLove.map((p)=>{
            return(                
                    <Link key={p.id} asChild href={{
                        pathname:`/${p.tipo}/show/${p.valor.id}`,
                        params:{publi:p.publicacion_id}}}>
                    <Pressable key={p.id}>                   
                    <View >
                        <View style={styles.contenedor_imagen}>
                        <Image style={{width:114,height:180,borderTopLeftRadius:8,borderTopRightRadius:8,alignSelf:'center'}} source={{uri:GetImage(p.valor.imagen)}}></Image>
                        <Text style={{textAlign:'left',padding:5}}>{p.valor.titulo.length>13?p.valor.titulo.slice(0,13)+"...":p.valor.titulo}</Text>
                        </View> 
                    </View>
                    </Pressable>                                       
                
                    </Link>
             
            )
           })}
        </View>
        :
        <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
            <View style={styles.estilos_icon}>
                <IconLove></IconLove>
            </View>
            <View>
                <Text style={{fontSize:15,fontWeight:"bold",textAlign:"center",width:200}}>No se ha dado me encanta a ninguna publicacion</Text>
            </View>
        </View>}
    </View>
    </>
  )
}
const styles=StyleSheet.create({
    estilos_icon:{
        padding:10,borderRadius:99,backgroundColor:"white",boxShadow:"0px 0px 8px 0px black",marginBottom:10
    },
    tiulo_love:{
        padding:10,
        fontWeight:"bold",
        textAlign:"center",
        textDecorationLine:"underline",
        textDecorationColor:"black"
    },
    contenedor_imagen:{
        height:210,
        width:118,
        marginRight:0.8,
        marginLeft:0.8,
        
        marginTop:10,
        marginBottom:5,
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:10,
        boxShadow:"0px 0px 8px 1px black",
        borderColor:"black",
        borderWidth:2,
        borderStyle:"solid"
    }
})
