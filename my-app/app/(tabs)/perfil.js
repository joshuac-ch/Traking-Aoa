import React, { useCallback, useEffect, useState } from 'react'
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router'
import constantes from 'expo-constants' 
import axios from 'axios'
import Metas from '../../hooks/Metas'
import Actividades from '../../hooks/Actividades'
import Habitos from '../../hooks/Habitos'
import { IconActivity, IconHeart } from '../../assets/Icons'
import Love from "../Perfil/Love.js"
export default function Perfil() {
    const {user}=useUser()
    const navegar=useRouter()
    const [user_specific, setuser_specific] = useState([])
    const [alldata, setalldata] = useState([])
    const {FectMetas,metas}=Metas()
    const {FetchActividades,actividades}=Actividades()
    const {FecthHabitos,habitos}=Habitos()
    const [dataMetas, setdataMetas] = useState([])
    const [dataHabitos, setdataHabitos] = useState([])
    const [dataActividades, setdataActividades] = useState([])
    //useEffect(()=>{
    //    FectMetas(),
    //    FecthHabitos(),
    //    FetchActividades()
    //},[])
    useEffect(()=>{
       if(actividades.length>0){
        setdataActividades(actividades.map((a)=>({...a,type:"Actividades"})))
       } 
    },[actividades])
    
    useEffect(()=>{
        if(habitos.length>0){
            setdataHabitos(habitos.map((a)=>({...a,type:"Habitos"})))
        }
    },[habitos])

    useEffect(()=>{
        if(metas.length>0){
            setdataMetas(metas.map((a)=>({...a,type:'Metas'})))
        }
    },[metas])

    useEffect(()=>{       
            if(metas.length>0 && habitos.length>0 && actividades.length>0){
                const tododata=[
                    ...metas.map((m)=>({...m,type:'Metas'})),
                    ...habitos.map((h)=>({...h,type:'Habitos'})),
                    ...actividades.map((a)=>({...a,type:'Actividades'}))
                ] 
                setalldata(tododata)
                //setdataActividades(actividades.map((a)=>({...a,type:"Actividades"})))
                //setdataMetas(metas.map((m)=>({...m,type:"Metas"})))
                //setdataHabitos(habitos.map((h)=>({...h,type:"Habitos"})))
                
            }     
    },[metas,actividades,habitos])
    const host=constantes.expoConfig.extra.host
    const FectUserSpecific=async()=>{
        try{
            const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
            setuser_specific(data)
        }catch(err){
            alert("Hubo un error: ",err.message)
        }
    }    
    useFocusEffect(
        useCallback(()=>{
            if(user.id){               
                FectUserSpecific(),
                FecthHabitos(),//si pongo en el focus calback perimnite acualizarse automaticamente 
                FectMetas(),
                FetchActividades()
                //hacer la bandeja de entrada
            }
        },[])
    )
    const [vistaActiva, setvistaActiva] = useState("actividad")

    const [Follows, setFollows] = useState(1)
    const ShowFollow=async()=>{
        const {data}=await axios.get(`http://${host}:4000/seguidor/count/${user.id}`)
        setFollows(data)
    }
    useEffect(()=>{
        ShowFollow()
    },[])
    const [PubLoves, setPubLoves] = useState(0)
    const ShowPubLoves=async()=>{
        const {data}=await axios.get(`http://${host}:4000/publicacion/loves/conteo/${user.id}`)
        setPubLoves(data)
    }
    useFocusEffect(
        useCallback(()=>{
            ShowPubLoves()
        },[])
    )
    const [myfollows, setmyfollows] = useState([])
    const Myfollows=async()=>{
        const {data}=await axios.get(`http://${host}:4000/seguidores/count/${user.id}`)
        setmyfollows(data)
    }
    useFocusEffect(
        useCallback(()=>{
            if(user.id){
                Myfollows()
            }
        },[user.id])
    )
   const navegarListaFollow=()=>{
    navegar.push({
        pathname:"Perfil/users/ListaPrincipal",
        params:{estado:"seguidores"}
    })
   }
    const navegarListaSiguiendo=()=>{
    navegar.push({
        pathname:"Perfil/users/ListaPrincipal",
        params:{estado:"siguiendo"}
    })
   }
  return (
   <>
   <ScrollView>
    <Stack.Screen options={{headerShown:false}}></Stack.Screen>
   <View style={styles.contenedor_principal}>
    <View >
        <Text >{user_specific.nombre}</Text>
    </View>
    <View style={{alignItems:'center'}}>
        <Image style={styles.image} source={{uri:user_specific.imagen}}></Image>
        <Text >{user_specific.correo}</Text>
    </View>
    <View style={styles.contenedor_sub}>
        <Pressable onPress={()=> navegarListaSiguiendo()}>
            <View style={styles.box}>
                <Text>{myfollows}</Text>
                <Text>Siguiendo</Text>
            </View>
        </Pressable>
        <Pressable onPress={()=>navegarListaFollow()}>
            <View style={styles.box}>
                <Text>{Follows}</Text>
                <Text>Seguidores</Text>
            </View>
        </Pressable>
        <View style={styles.box}>
            <Text>{PubLoves}</Text>
            <Text>Me gusta</Text>
        </View>
    </View>
    <View style={styles.contenedor_edit}>
        <View style={styles.contenedor}>
            <Pressable onPress={()=>navegar.push(`/Perfil/${user_specific.id}`)}>
                <Text>Editar Perfil</Text>
            </Pressable>
        </View>
        <View style={styles.contenedor}>
            <Pressable>
                <Text>Compartir Perfil</Text>
            </Pressable>
        </View>      
        
    </View>
   
   </View>
   <View style={{flexDirection:'row',justifyContent:'space-around',margin:15,alignItems:"center"}}>
             <View>
                <Pressable onPress={()=>setvistaActiva("actividad")}>                    
                    <IconActivity></IconActivity>
                </Pressable>                
              </View>
              <View>
                <Pressable onPress={()=>setvistaActiva("love")}>
                    <IconHeart></IconHeart>    
                </Pressable>           
              </View>    
        </View>  
    <View>
        {vistaActiva=="actividad"?
        <View>
    <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                {alldata!=null?
               alldata.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               
                               {a.imagen&&(
                                 <Image source={{uri:a.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                               )}
                               <View style={styles.div_c_body}>
                                    <Text>{a.titulo.length>15?a.titulo.slice(0,12)+"...":a.titulo}</Text>
                                </View>
                            </View>
                       </View> 
                      </Pressable>
                      </Link>
                    )
                })
                :<Text>No hay datos</Text>}
                    
              </View>
       
             
        <View >
            <Text style={styles.proyecto_title}>Actividades</Text>
        </View>
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                {dataActividades!=null?
               dataActividades.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               <Image source={{uri:a.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{a.titulo.length>15?a.titulo.slice(0,12)+"...":a.titulo}</Text>
                                </View>
                            </View>
                       </View> 
                      </Pressable>
                      </Link>
                    )
                })
                :<Text>No hay datos</Text>}
                    
              </View>
            <View >
                <Text style={styles.proyecto_title}>Habitos</Text>
            </View>
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                {dataHabitos!=null?
               dataHabitos.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                              <Image source={{uri:a.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{a.titulo.length>15?a.titulo.slice(0,12)+"...":a.titulo}</Text>
                                </View>
                            </View>
                       </View> 
                      </Pressable>
                      </Link>
                    )
                })
                :<Text>No hay datos</Text>}
                    
              </View>

            <View >
                <Text style={styles.proyecto_title}>Metas</Text>
            </View>
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                {dataMetas!=null?
               dataMetas.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               <Image source={{uri:a.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{a.titulo.length>15?a.titulo.slice(0,13)+"...":a.titulo}</Text>
                                </View>
                            </View>
                       </View> 
                      </Pressable>
                      </Link>
                    )
                })
                :<Text>No hay datos</Text>}
                    
              </View>      
       
       
        
        </View> 
        :<Love></Love>}
    </View>
    </ScrollView>   
   </>
  )
}
const styles=StyleSheet.create({
    proyecto_title:{
        textAlign:'center',
        fontWeight:'bold',
        textDecorationLine:"underline",
       
        padding:20,
    },
    proyecto:{
        flexDirection:'column',
        justifyContent:'center'       
    },
    proyecto_c:{
        
        flexDirection:'row',
        borderWidth:1,
        borderColor:'black',
        borderStyle:'solid',
        borderRadius:5,
        width:135,
        height:165,
        marginTop:8,
        marginRight:0.8,
        marginLeft:0.8,
        marginBottom:8
    },
    div_c_header:{
       
        alignItems:'flex-end',
    },
    div_c_body:{        
        backgroundColor:'transparent',
        alignItems:'flex-start',      
        padding:10,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
    },
    
    contenedor:{
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'white',
        padding:10,
        borderRadius:10,
        margin:10,
    },
    contenedor_edit:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        
    },
    contenedor_principal:{
        display:'flex',       
        justifyContent:'center',
        alignItems:'center',
      marginLeft:0,
      marginRight:0,
      marginBottom:0,
      marginTop:55
        
       
    },
    contenedor_sub:{        
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    box:{        
        alignItems:'center',
        justifyContent:'center',
         padding:20
    },
    image:{
        
        width:100,
        height:100,
        borderRadius:50,
        
    }
})