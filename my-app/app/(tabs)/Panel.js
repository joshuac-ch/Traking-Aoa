import React, { use, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Button, Dimensions, Easing, Image, LayoutAnimation, Modal, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native'
import { useUser } from '../../components/UserContext'

import PagerView from 'react-native-pager-view'
import { Link, router, Stack, Tabs, useFocusEffect, useRouter } from 'expo-router'
import { IconAdd, IconClose, IconComment, IconElipsis, IconHeart, IconHeartActive, IconLeft, IconReply, IconText } from '../../assets/Icons'
import constantes from 'expo-constants'
import axios from 'axios'
import { useHistoryial } from '../../components/HistorialProvider'
import { ToastAndroid } from 'react-native'
import Metas from '../../hooks/Metas'
import Comentario from '../../components/Comentario'
//crear rutas en el feed
//mejororar diseño
//crear el diseño par ael login
export default function Panel() {
    const {user}=useUser()
    const  host=constantes.expoConfig.extra.host
    const [miuser, setmiuser] = useState([])
    const navegar=useRouter()
    const ShowUser=async()=>{
      
      try{
        const {data} = await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
        setmiuser(data)
      }catch(er){
        //alert("Hubo un error"+er.message)
        navegar.push("/Login/app")
      }
    }
    useFocusEffect(
      useCallback(()=>{
        if(user.id){
          ShowUser()
        }
      },[user.id])
    )
    const [mostrarModal, setmostrarModal] = useState(true)
    const [emocionSeleccionada, setemocionSeleccionada] = useState({
      emocion:"",
      usuario_id:0,
      nivel:""      
    })
    const FormEmociones=async()=>{
      //alert(`¡Gracias! por tu respuesta de hoy ${miuser.nombre}`)
      await axios.post(`http://${host}:4000/emociones/i`,emocionSeleccionada)
      setmostrarModal(false)
    }    
    const emociones=[
      {emo:1,des:"Cansado"},
      {emo:2,des:"Triste"},
      {emo:3,des:"Neutral"},
      {emo:4,des:"Molesto"},
      {emo:5,des:"Feliz"},

    ]

    const [dataSeguidor, setdataSeguidor] = useState([])
    
    const {seguidor,setseguidor,usuarioFollowID}=useHistoryial()
     const MostarDatauserSub=async()=>{        
        const {data}=await axios.get(`http://${host}:4000/seguidores/actividadesfollow/${user.id}`)
        const PublicacionCreador=await Promise.all(
          data.map(async(p)=>{
            const res=await  axios.get(`http://${host}:4000/usuarios/s/${p.usuario_id}`)
            
            return{
              ...p,
              creador:res.data
            }
          })
        )
       setdataSeguidor(PublicacionCreador)
       
           
      //console.log(data)
      //tener en cuenta el true de esetado si no es true no muestra datos
      }
      
     
     useFocusEffect(
      useCallback(()=>{
        if(user.id){
        
        MostarDatauserSub()
      }
      },[user.id])
     )
     const [dataPublicacionFollow, setdataPublicacionFollow] = useState([])
    const ShowPublicacion=async()=>{
      const {data}=await axios.get(`http://${host}:4000/publicaciones/feed/${user.id}`)
      setdataPublicacionFollow(data)        
    }
    useFocusEffect(
      useCallback(()=>{
        if(user.id){
          ShowPublicacion()
        }
      },[user.id])
    )
    const LovePublicacion=async(user,pub)=>{
      await axios.post(`http://${host}:4000/publicacion/likes/i/${user}/${pub}`) 
      ToastAndroid.show("Me encanta esta publicacion",ToastAndroid.BOTTOM) 
    } 
   const {FectMetas,metas}=Metas()
    useFocusEffect(
      useCallback(()=>{
        FectMetas()
      },[])
    )
    const ChangeEmcoicon=async()=>{
      setemocionSeleccionada(prev=>({
        ...prev,
        nivel:e.emo,
        emocion:e.des,
        usuario_id:user.id
        
      }))
    }
    const [dataCountLoves, setdataCountLoves] = useState({})
  const CountIlove=async(pub)=>{
    const {data}=await axios .get(`http://${host}:4000/publicacion/likes/conteo/${pub}`)
    setdataCountLoves(prev=>({...prev,[pub]:data}))
  }
  const DeleteLove=async(user,pub)=>{
    await axios.delete(`http://${host}:4000/publicacion/likes/d/${user}/${pub}`)
    ToastAndroid.show("Se quito el me encanta esta publicacion",ToastAndroid.BOTTOM) 
  } 
  const [meEncanta, setmeEncanta] = useState({})
  const toggleLove=async(user,pub)=>{
   const yaDisteLike=meEncanta[pub]
   const estado={
    ...meEncanta,
    [pub]:!yaDisteLike
  }
  setmeEncanta(estado)  
  if(!yaDisteLike){
     await LovePublicacion(user,pub)
  }else{
     await DeleteLove(user,pub)
  }
  await CountIlove(pub)
    
  }
  //IMPORTANTE         
  //solo se muestra los comentarios en corazon de perfil de cualquier usuario y en feed    
  //hacer el cambio en perfiler ajenos se vea los comentarios
  //tambien en notificaciones que se vea los comentarios
  // si deja de seguir eliminar el post listo al pero falta el el like  
  // eliminar el seguir de notis en caso ya no lo sigue se guarda al parecer  
  //al quitar el like tambien eliminar en la noti si esque se pueda
    const cargarLikes = async () => {
    const { data } = await axios.get(`http://${host}:4000/publicacion/likes/getLove/${user.id}`)
    const likesMap = {}
    data.forEach(pubID => {
      likesMap[pubID] = true
    })
    setmeEncanta(likesMap)    
  }
   
  useFocusEffect(
    useCallback(()=>{
      if(user.id){
        cargarLikes()
        
      }
    },[user.id])
  )
  //boton para mostra y ocultar comentarios
 const [estadopublicacion, setestadopublicacion] = useState(true)
 const anims=useRef({}).current
 const getAnim=(pubID)=>{
  if(!anims[pubID]){
    anims[pubID]=new Animated.Value(1)
  }
  return anims[pubID]
 }
 const OcultarComentarios=(pubID)=>{
  try{
    const anim=getAnim(pubID)
    const isvisible=estadopublicacion==pubID
    Animated.timing(anim,{
      toValue:isvisible?0:1,
      duration:200,
      useNativeDriver:false
    }).start()
    setestadopublicacion(isvisible?null:pubID)
  }catch(err){
    console.error(err.message)
  }
 }

 const animaciones=useRef({}).current 
 const RenderBoton=(key,label,ruta_principal,create)=>{
   if(!animaciones[key]){
      animaciones[key]=new Animated.Value(0)
  }
  const anim=animaciones[key]
  
  const backgroundColor=anim.interpolate({
    inputRange:[0,1],
    outputRange:["transparent","#a3a3a3"]
  }) 
  const navegar=(ruta)=>{
  Animated.timing(anim,{
    toValue:1,
    duration:200,
    useNativeDriver:false
  }).start(()=>{
    anim.setValue(0)
    router.push(ruta)
  })
 }
 return(
    <Animated.View style={{backgroundColor:backgroundColor,borderRadius:20}}>      
      <View style={styles.contenedorpresabe}>
      <Pressable onPress={() => navegar(ruta_principal)}>
        <View style={styles.btn_router}>
          <IconLeft />         
            <Text style={{marginLeft: 10}}>Ir a {label}</Text>
          </View>
      </Pressable>

      <Pressable onPress={() => navegar(create)} >
        <View>
          <IconAdd />
        </View>
      </Pressable>
      </View>
    </Animated.View>
  )
 }
 const animacionCirbleBtn=useRef(new Animated.Value(0)).current
 const AnimacionCirle=(ruta)=>{
    Animated.timing(animacionCirbleBtn,{
      toValue:1,
      //easing:Easing.back(),
      useNativeDriver:false,
      duration:300
    }).start(()=>{
      animacionCirbleBtn.setValue(0)
      router.push(ruta)
    })
}
const border=animacionCirbleBtn.interpolate({
  inputRange:[0,1],
  outputRange:[0,50]
})
const backgroud=animacionCirbleBtn.interpolate({
  inputRange:[0,1],
  outputRange:["transparent","#a3a3a3"]
})
const [imagenSeleccionada, setimagenSeleccionada] = useState(null)
const anchoPantalla=Dimensions.get('window').width
const anchoImagen=metas.length===1?anchoPantalla-60:(anchoPantalla-60)/metas.length
  return (
      <ScrollView>
        
       
     <Stack.Screen options={{headerShown:false}}></Stack.Screen>
     
        <View key={miuser.id}  style={styles.contenedor_perfil}>
        <View style={{flexDirection:'row'}}>
          <Image style={styles.image} source={{uri:miuser.imagen}}></Image>
        <View style={{flexDirection:'column',justifyContent:"flex-start",marginTop:10,height:20}}>{/*Verficar esto */}
            <Text >{miuser.nombre} {miuser.apellido}</Text>
            <Text style={{fontWeight:'bold'}}>{miuser.correo}</Text>
        </View>       
        </View>

        <View>  
          <Animated.View style={{borderRadius:border,backgroundColor:backgroud}}>            
              <Pressable style={{padding:5}} onPress={()=>AnimacionCirle("/configuracion")} >
                               
                   <IconElipsis></IconElipsis>
               
              </Pressable>
           </Animated.View>                
        </View>
        
        </View>
    <View style={{marginLeft:30,marginBottom:10}}>
       <Text style={{fontSize:13}}>Metas para este {new Date().getFullYear()}</Text>
    </View>   
   <ScrollView  horizontal showsHorizontalScrollIndicator={false} scrollEnabled={metas.length>=5} contentContainerStyle={{paddingHorizontal:30,alignItems:"center"}}>
    <View style={[styles.contenedorCarrusel]}>
      
        {metas.map((m)=>{
          return(
            <Link href={`/Metas/show/${m.id}`} key={m.id} asChild>
            <Pressable>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={{uri:m.imagen}} style={[styles.imagenCarrusel,{width:metas.length>=5?110:anchoImagen}]}></Image>
                <View style={[styles.TextCarrusel,{width:metas.length>=5?110:anchoImagen}]}>
                  <Text numberOfLines={1}>{m.titulo}</Text>
                </View>
            </View>
            </Pressable>
            </Link>
          )
        })}        
          
    </View>
   </ScrollView>
    
    <View style={styles.vista_acti}>
      <View style={styles.contendorRutina}>
       
    
      {RenderBoton("actividad","Actividades","/Actividades/ActividadesDiarias","/Actividades/Create")}
      {RenderBoton("habitos","Habitos","/Habitos","/Habitos/create")}
      {RenderBoton("metas","Metas","/Metas","/Metas/create")}
     
      
      <Link href={"/centro"} asChild>
      <Pressable>
        <View>
        <Text>Analisis inteligente</Text>
      </View>
      </Pressable>
      </Link>
      </View>
      <View>
        {
       dataPublicacionFollow.length>0?
        dataPublicacionFollow.map((d,i)=>{          
           const anim=getAnim(d.id)
           const escala=anim.interpolate({
            inputRange:[0,1],
            outputRange:[0,1]
           })
           const opacity=anim.interpolate({            
              inputRange: [0, 1],
              outputRange: [0, 1],
            
           })
          return(
                     
           <View  key={i} style={styles.modelo_pub}>
             
            <View style={{margin:10}}>
             <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
               <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
               <Link href={`/Perfil/users/${d.creador.id}`} asChild>
               <Pressable>
                 <View>
                  <Image source={{uri:d.creador.imagen}} style={{width:50,height:50,borderRadius:50,marginRight:15}}></Image>
                </View>
               </Pressable>
               </Link>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{marginRight:20}}>{d.creador.nombre}</Text>
                    <Text style={{color:'#787777'}}>{d.tipo}</Text>
                  </View>
                  <Text style={{fontWeight:'bold'}}>{d.creador.correo}</Text>
                </View>
              </View>
              <View>
                <IconElipsis></IconElipsis>
              </View>
             </View>
              <Text>{d.contendo.titulo}</Text>
              <Text>{d.contendo.descripcion}</Text>
            </View>
              <Pressable onPress={()=>setimagenSeleccionada(d.contendo.imagen)}>
                <Image style={{width:200,height:250,borderRadius:20,alignSelf:'center'}} source={{uri:d.contendo.imagen}}></Image>
              </Pressable>
              <Modal visible={!!imagenSeleccionada} transparent={true} animationType='fade'>
                <View style={{flex:1,backgroundColor:"black"}}>
                 <Pressable
                  onPress={() => setimagenSeleccionada(null)}
                  style={{
                    position: 'absolute',
                    top: 40,
                    right: 20,
                    zIndex: 10,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    
                    borderRadius: 50
                  }}
                >
                  <IconClose></IconClose>
                </Pressable>
                  <Pressable onPress={()=>setimagenSeleccionada(null)}>
                    <Image style={{width:"100%",height:"100%",resizeMode:"contain",alignSelf:'center'}} source={{uri:imagenSeleccionada}}></Image>
                  </Pressable>
                </View>
              </Modal>
              <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              
                <View style={{flexDirection:'row',alignItems:'center',marginTop:10,marginBottom:10}}>
                  {/*Esto mejorar el CountLove no puede quedarse asi */}
                 <Pressable onPress={()=>toggleLove(user.id,d.id)}>
                  <View style={{
                    backgroundColor:"white",
                    padding:10,
                    borderRadius:50,
                    elevation:6,
                    boxShadow:meEncanta[d.id]?"0px 0px 8px 1px red":""
                   
                  }}>
                     <IconHeartActive color={meEncanta[d.id]?"red":"black"}></IconHeartActive>
                  </View>
                 </Pressable>
                                               
                  <Text  style={{marginLeft:10}}>{/*{dataCountLoves[d.id]||"0"} */}Me encanta</Text>                
              </View>
             
              <View style={{flexDirection:'row'}}>
               <Pressable onPress={()=>OcultarComentarios(d.id)} style={{flexDirection:"row"}} >
                 <IconComment></IconComment>
                <Text style={{marginLeft:10}}>Comentarios</Text>
               </Pressable>
              </View>
              </View>
             {estadopublicacion==d.id&&(
               <Animated.View style={{transform:[{scaleY:escala}],opacity:opacity,overflow:"hidden"}}>
                 <Comentario pubID={d.id}></Comentario>
              </Animated.View>
             )}
             
          </View>
         
        
          )
        })
       :<Text>No hay publicaciones actualmente</Text>
        }
      </View>
      {/*
      <View>
      {
        dataSeguidorHabitos.length>0?
        dataSeguidorHabitos.map((h)=>{
          return(
            <View style={styles.modelo_pub} key={h.id}>
              <View style={{margin:10}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View>
                    <Image source={{uri:h.creador.imagen}} style={{width:50,height:50,borderRadius:50,marginRight:15}}></Image>                
                </View>
                <View>
                  <View style={{flexDirection:'row'}}>
                     <Text style={{marginRight:20}}>{h.creador.nombre}</Text>
                     <Text style={{color:'#787777'}}>{h.type}</Text>
                  </View>                 
                  <Text style={{fontWeight:'bold'}}>{h.creador.correo}</Text>
                </View>
                </View>
                <View >
                  <IconElipsis ></IconElipsis>
                </View>
              </View>
             <View style={{marginLeft:5,marginTop:10,marginBottom:15}}>
              <View>
                <Text>{h.titulo}</Text>
                <Text>{h.descripcion}</Text>
              </View>
             </View>
              
              <View>
                 <Image source={{uri:h.imagen}} style={{width:180,height:250,alignSelf:'center',borderRadius:20}}></Image>
              </View>
               <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <View style={{flexDirection:'row',marginTop:10,marginBottom:10,alignItems:'center'}}>
               <Pressable onPress={toggleLove}>
                <View style={{
                   backgroundColor: 'white', // fondo para que se vea bien la sombra
                   padding: 10,
                   borderRadius: 30, // redondeado total
                   boxShadow:meEncanta?"0px 0px 20px 0px red":"",                              
                   elevation:6,// Android,                  
                   alignSelf: 'center',
                }}>
                  <IconHeartActive color={meEncanta?"red":"black"}></IconHeartActive>
                  
                </View>
               </Pressable>
                <Text  style={{marginLeft:10}}>Me encanta</Text>
                
              </View>
              <View style={{flexDirection:'row'}}>
                <IconReply></IconReply>
                <Text style={{marginLeft:10}}>Compartir</Text>
              </View>
              </View>  
             </View>
           </View>
          )
        })
        :""        
      }  
      </View>  
      */}
        
      <View>
       
       {/*
       <Modal visible={mostrarModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={{textAlign:'center',marginBottom:10,fontSize:20,fontWeight:'bold'}}>¿Cómo te sientes hoy?</Text>
            <View style={styles.emociones}>
              {emociones.map((e, i) => (
                <Pressable key={i} onPress={() => setemocionSeleccionada(prev=>({
        ...prev,
        nivel:e.emo,
        emocion:e.des,
        usuario_id:user.id
        
      }))}>
                  <Text style={[
                    styles.radio_emo,
                    emocionSeleccionada.nivel === e.emo && {backgroundColor:'purple',color:'white'} 
                  ]}>
                    {e.emo}
                  </Text>
                  <Text style={{textAlign:'center'}}>{e.des}</Text>
                </Pressable>
              ))}
            </View>
          <View style={{margin:20}}>
              <Button onPress={FormEmociones} title='Enviar' ></Button>
          </View>
          </View>
        </View>
      </Modal>
       */}
      
        
      </View>
      
      
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
  contendorRutina:{
    display:"flex",
    justifyContent:"space-between",
    height:180,
  },
  modelo_pub:{
    backgroundColor:"white",
    borderRadius:20,
    borderColor:"transparent",
    borderStyle:"solid",
    borderWidth:2,
    marginTop:10,
    marginBottom:10
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // fondo oscuro
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    
  },
  radio_emo:{
    borderWidth:2,
    borderColor:'black',
    borderStyle:'solid',
    width:50,    
    textAlign:'center',
    height:50,
    textAlignVertical: 'center',
    fontSize:18,
    borderRadius:99
  },
  emociones:{
    flexDirection:'row',
    alignItems:'center',  
    justifyContent:'space-between'
        
  },
  contenedorpresabe:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:20,
    
    paddingRight:10,
    boxShadow:'0px 0px 8px 1px black',
  },
    contenedor_perfil:{
      
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      padding:10,
      marginLeft:10,
      marginRight:10,
      marginBottom:10,
      marginTop:55
    },
    btn_router:{
      flexDirection:'row',
        
      padding:5,
      width:280,
      
        
    }
    ,
    vista_acti:{
      
      paddingTop:15,      
      margin:20,
      padding:10
    },
    contenedorCarrusel:{
        
        display:'flex',
        flexDirection:"row",
         overflow:"hidden",
        justifyContent:'center',
        alignItems: 'center',
        
        
                
        
    },
    TextCarrusel:{
      
            
      padding:5,
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
        
        height:250,
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