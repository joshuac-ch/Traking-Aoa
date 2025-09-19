import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router'
import constantes from 'expo-constants' 
import axios from 'axios'
import Metas from '../../hooks/Metas'
import Actividades from '../../hooks/Actividades'
import Habitos from '../../hooks/Habitos'
import { IconActivity, IconActivityPerfil, IconEditPerfil, IconHeart, IconLock } from '../../assets/Icons'
import Love from "../Perfil/Love.js"
import GetImage from '../../utils/GetImage.js'
import getHost from '../../hooks/getHost.js'
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
    const host=getHost()
    //useEffect(()=>{
    //    FectMetas(),
    //    FecthHabitos(),
    //    FetchActividades()
    //},[])
    const FectDatosPubActividad=async()=>{
        const {data}=await axios.get(`http://${host}:4000/publicacion/actividades/${user.id}`)
        setdataActividades(data)
    } 
    
    const FecthDatosPubHabitos=async()=>{
        const {data}=await axios.get(`http://${host}:4000/publicacion/habitos/${user.id}`)
        setdataHabitos(data)
    }
    useFocusEffect(
        useCallback(()=>{
            if(user.id){
                FectDatosPubActividad(),
                FecthDatosPubHabitos()
            }},[user.id])    
    )
    //useEffect(()=>{
    //    if(habitos.length>0){
    //        setdataHabitos(habitos.map((a)=>({...a,type:"Habitos"})))
    //    }
    //},[habitos])

    useEffect(()=>{
        if(metas.length>0){
            setdataMetas(metas.map((a)=>({...a,type:'Metas'})))
        }
    },[metas])
//crear el eliminar publicacion
//TENER EN CUNETA LO SIGUIENTE SI CREAS CUALQUIER TIPO DE RUTINA TIENES QUE SI O SI que muestre en el perfil las pubicaciones no actividades  
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
   const estadobtn=useRef({}).current
   const RendenBoton=({boton,label,Icono})=>{
    if(!estadobtn[boton]){
        estadobtn[boton]=new Animated.Value(0)
    }
    const anim=estadobtn[boton]
    const backcolor=anim.interpolate({
    inputRange:[0,1],
    outputRange:["transparent","#a3a3a3"]
   }) 
   const borderRad=anim.interpolate({
    inputRange:[0,1],
    outputRange:[0,50]
   })
    const handlerpress=()=>{
        Animated.timing(anim,{
        toValue:1,
        duration:200,
        useNativeDriver:false
    }).start(()=>{
        anim.setValue(0)
        setvistaActiva(label)
    })
    }
    return(
         <Pressable onPress={handlerpress}>
                <Animated.View style={{backgroundColor:backcolor,borderRadius:borderRad}}>
                    <View style={{padding:10}}>                    
                        <Icono color={"white"}/>
                    </View>
                </Animated.View>                
        </Pressable>
    )
   }
   
  return (
   <>
   <ScrollView style={{backgroundColor:"#131313"}}>
    <Stack.Screen options={{headerShown:false}}></Stack.Screen>
    <View >
   <View style={styles.contenedor_principal}>
    <View >
        <Text style={{color:"white"}}>{user_specific.nombre}</Text>
    </View>
    <View style={{alignItems:'center'}}>
        <Image style={styles.image} source={{uri:GetImage(user_specific.imagen)}}></Image>
        <Text style={{color:"white",fontWeight:"semibold"}}>{user_specific.correo}</Text>
    </View>
    <View style={styles.contenedor_sub}>
        <Pressable onPress={()=> navegarListaSiguiendo()}>
            <View style={styles.box}>
                <Text style={{color:"white"}}>{myfollows}</Text>
                <Text style={{color:"white"}}>Siguiendo</Text>
            </View>
        </Pressable>
        <Pressable onPress={()=>navegarListaFollow()}>
            <View style={styles.box}>
                <Text style={{color:"white"}}>{Follows}</Text>
                <Text style={{color:"white"}}>Seguidores</Text>
            </View>
        </Pressable>
        <View style={styles.box}>
            <Text style={{color:"white"}}>{PubLoves}</Text>
            <Text style={{color:"white"}}>Me gusta</Text>
        </View>
    </View>
    <View style={styles.contenedor_edit}>
        <View style={styles.contenedor}>
            <Pressable onPress={()=>navegar.push(`/Perfil/${user_specific.id}`)}>
                <Text style={{color:"white"}}>Editar Perfil</Text>
            </Pressable>
        </View>
        <View style={styles.contenedor}>
            <Pressable>
                <Text style={{color:"white"}}>Compartir Perfil</Text>
            </Pressable>
        </View>      
        
    </View>
    <View style={{alignSelf:"center",marginTop:10}}>
        <Text style={{textAlign:"center",color:"white"}}>{user_specific.des?user_specific.des:"Welcome my Profile 💜💜"}</Text>
    </View>
   
   </View>
   <View style={{flexDirection:'row',justifyContent:'space-around',margin:10,alignItems:"center"}}>
            <View>
                <RendenBoton boton={"rutina"} label={"actividad"} Icono={IconActivity}></RendenBoton>
            </View>
            <View>
                 <RendenBoton boton={"loves"} label={"loves"} Icono={IconHeart}></RendenBoton>                          
            </View>    
        </View>  
    <View>
        {vistaActiva=="actividad"?
        <View>
   {/*
   Pensar si lo nesesitamos
   lo que hace es motrar todas las pubulicaciones siempre y cuando rengamos una de cada una
    <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:"center"}}>
                {alldata.length>0?
               alldata.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               
                               {a.imagen&&(
                                 <Image source={{uri:a.imagen}} style={{width:133,height:150,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                               )}
                               <View style={styles.div_c_body}>
                                    <Text style={{paddingLeft:5}}>{a.titulo.length>15?a.titulo.slice(0,12)+"...":a.titulo}</Text>
                                </View>
                            </View>
                       </View> 
                      </Pressable>
                      </Link>
                    )
                })
                :<Text>No hay publicaciones disponibles</Text>}
                    
              </View>
   */}
       
             
        <View >
            <Text style={styles.proyecto_title}>Actividades</Text>
        </View>
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                {dataActividades.length>0?
               dataActividades.map((a)=>{
                    return(
                        
                        <View key={a.pub.id} style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-start"}} >
                            <Link style={{zIndex:1,marginTop:10,position:"absolute"}} asChild href={`/${a.pub.tipo}/${a.rutina.id}`}>
                            <Pressable>
                                <IconEditPerfil></IconEditPerfil>
                            </Pressable>
                            </Link>
                            <Link href={{pathname:`/${a.pub.tipo}/show/${a.rutina.id}`,params:{publi:a.pub.id}}} asChild>
                            <Pressable>
                            <View style={styles.proyecto_c}>

                                <View style={{display:'flex',justifyContent:'space-between'}}>
                                {a.rutina.imagen&&(
                                    <Image source={{uri:GetImage(a.rutina.imagen)}} style={{width:116,height:150,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                
                                )}
                                    <View style={styles.div_c_body}>
                                        <Text style={{paddingLeft:5,color:"white"}}>{a.rutina.titulo.length>15?a.rutina.titulo.slice(0,12)+"...":a.rutina.titulo}</Text>
                                    </View>
                                </View>
                            </View> 
                            </Pressable>
                            </Link>
                        </View>
                      
                    )
                })
                :<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={styles.estilos_icons}>
                        <IconActivityPerfil></IconActivityPerfil>
                    </View>
                    <View>
                        <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:15}}>Sube tu primera Actividad</Text>
                        <Text style={{color:"white",textAlign:"center"}}>Tus actividades publicadas apareceran aqui</Text>
                    </View>
                     
                   
                 </View>}
                    
              </View>
            <View >
                <Text style={styles.proyecto_title}>Habitos</Text>
            </View>
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                {dataHabitos.length>0?
               dataHabitos.map((a,i)=>{
                    return(
                      <View style={{flexDirection:"row",justifyContent:"flex-end"}} key={a.pub.id}>
                        <Link style={{position:"absolute",marginTop:10,zIndex:1}} asChild href={`/${a.pub.tipo}/${a.rutina.id}`}>
                            <Pressable>
                                <IconEditPerfil></IconEditPerfil>
                            </Pressable>
                        </Link>
                        <Link href={{pathname:`/${a.pub.tipo}/show/${a.rutina.id}`,params:{publi:a.pub.id}}} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                              {a.rutina.imagen&&(
                                <Image source={{uri:GetImage(a.rutina.imagen)}} style={{width:116,height:150,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                              )}
                              <View style={styles.div_c_body}>
                                    <Text style={{paddingLeft:5,color:"white"}}>{a.rutina.titulo.length>15?a.rutina.titulo.slice(0,12)+"...":a.rutina.titulo}</Text>
                                </View>
                            </View>
                       </View> 
                      </Pressable>
                      </Link>
                      </View>
                    )
                })
                :<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={styles.estilos_icons}>
                        <IconActivityPerfil></IconActivityPerfil>
                    </View>
                    <View>
                        <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:15}}>Sube tu primer Habito</Text>
                        <Text style={{color:"white",textAlign:"center"}}>Tus habitos publicadas apareceran aqui</Text>
                    </View>
                     
                   
                 </View>}
                    
              </View>
{/*TENER EN CUENTA QUE METAS NO NESECITA DEL GETIMAGE PORQUE ESTE YA LO USA EN EL SETDATAMETAS*/}
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Text style={styles.proyecto_title}>Metas</Text>
                <IconLock color='white'></IconLock>
            </View>
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
                {dataMetas.length>0?
               dataMetas.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               {a.imagen &&(
                                <Image source={{uri:a.imagen}} style={{width:116,height:150,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                
                               )}
                               <View style={styles.div_c_body}>
                                    <Text style={{color:"white",paddingLeft:5}}>{a.titulo.length>15?a.titulo.slice(0,13)+"...":a.titulo}</Text>
                                </View>
                            </View>
                       </View> 
                      </Pressable>
                      </Link>
                    )
                })
                :
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={styles.estilos_icons}>
                        <IconActivityPerfil></IconActivityPerfil>
                    </View>
                    <View>
                        <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:15}}>Sube tu primera Meta</Text>
                        <Text style={{color:"white",textAlign:"center"}}>Tus metas solo tu las podras vizualizar</Text>
                    </View>
                     
                   
                 </View>}
                    
              </View>      
       
       
        
        </View> 
        :<Love></Love>}
    </View>
    </View>
    </ScrollView>   
   </>
  )
}
const styles=StyleSheet.create({
    estilos_icons:{
        padding:10,borderRadius:99,backgroundColor:"white",boxShadow:"0px 0px 8px 0px black"
    },
    proyecto_title:{
        textAlign:'center',
        fontWeight:'bold',
        textDecorationLine:"underline",
        color:"white",
        padding:10,
    },
    proyecto:{
        flexDirection:'column',
        justifyContent:'center'       
    },
    proyecto_c:{
        boxShadow:"0px 0px 2px 1px black",
        flexDirection:'row',
        borderWidth:1,
        borderColor:'black',
        borderStyle:'solid',
        borderRadius:5,
        width:118,       
        height:185,
        marginTop:8,
        marginRight:0.8,
        marginLeft:0.8,
        marginBottom:8
    },
    div_c_header:{
       
        alignItems:'flex-end',
    },
    div_c_body:{        
        boxShadow:"0px 0px 8px 1px black",
        backgroundColor:'transparent',
        alignItems:'flex-start',   
        paddingTop:8,
        paddingBottom:5,        
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