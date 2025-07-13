import React, { useCallback, useEffect, useState } from 'react'
import { View,Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import { IconElipsis, IconHome, IconLeft, IconSeach, IconSettings, IconUser } from '../../assets/Icons'
import { Link, Stack, useFocusEffect } from 'expo-router'
import axios from 'axios'
import constantes from "expo-constants" 
import { useUser } from '../../components/UserContext'
export default function notificaciones() {
  const [notiUser, setnotiUser] = useState([])
  const {user}=useUser()
  const host=constantes.expoConfig.extra.host
  const notificaciones=async()=>{
    const {data}=await axios.get(`http://${host}:4000/notificaciones/xuser/${user.id}`)
    setnotiUser(data)
    
  }
  const [likesuser, setlikesuser] = useState([])
  const notificacionesLikes=async()=>{
    const {data}=await axios.get(`http://${host}:4000/notificaciones/user/likes/${user.id}`)
    setlikesuser(data)
  }
  
  const [notifollow, setnotifollow] = useState([])
  const notificacionesFollow=async()=>{
    const {data}=await axios.get(`http://${host}:4000/notificaciones/user/follow/${user.id}`)
    setnotifollow(data)
  }

  useFocusEffect(
    useCallback(()=>{
      if(user.id){
        notificaciones(),
        notificacionesLikes(),
        notificacionesFollow()
      }
    },[user.id])
  )
  const [notificaciontotal, setnotificaciontotal] = useState({
    notislikes:[],
    notispost:[],
    notifollow:[]
  })
  const ObtenerAllNotificaciones=async()=>{
    setnotificaciontotal({
      notislikes:likesuser,
      notispost:notiUser,
      notisfollow:notifollow      
    })
    console.log(JSON.stringify(notificaciontotal,null,2))
  } 
   useFocusEffect(
    useCallback(()=>{
      if(likesuser.length>0 || notiUser.length>0 || notifollow.length>0){//Esto se modifico para que se vea notificacion por notificacion
       ObtenerAllNotificaciones()
      }   
    },[likesuser,notiUser,notifollow])
  )
  const [creador, setcreador] = useState([])
  const Getuser=async()=>{
    const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
    setcreador(data)
  }
  useFocusEffect(
    useCallback(()=>{
      if(user.id){
        Getuser()
      }
    },[user.id])
  )
  //Se creo por ahora que se vena las notificaciones si seguimos al usuarios
  //crear en el post (listo)
  //crear en el me gusta
  //crear en el me sigue
  return ( 
    <>
    <ScrollView>
    <Stack.Screen options={{headerShown:false}}></Stack.Screen>
    <View style={{marginTop:55}}></View>
    <View >
     
    <View>
          <View style={{flexDirection:"row",justifyContent:"space-between",margin:10,alignItems:"center"}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <Image source={{uri:creador.imagen}} style={{width:50,height:50,borderRadius:50}}></Image>
              <Text style={{marginLeft:10,fontSize:18,fontWeight:"bold"}}>Notificaciones</Text>
            </View>
            <View>
              <IconSettings></IconSettings>
            </View>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",margin:10}}>
            <View>
              <Text style={{fontWeight:"bold"}}>Todas</Text>
            </View>
            <View>
              <Text>Verificado</Text>
            </View>
            <View>
              <Text>Menciones</Text>
            </View>
          </View>
          <View>
            {likesuser.length>0 || 
             notiUser.length>0 || 
             notifollow.length>0?
            (
              <View style={styles.principal}>
            {
            notificaciontotal?.notispost?.length>0?
            notificaciontotal.notispost.map((n,i)=>{
            return(
              n.noti.tipo=="Post_Actividad" || n.noti.tipo=="Post_habito"?
             <Link href={`/${n.tipo}/show/${n.post.id}`} key={i} asChild>
              <Pressable>
                 <View style={styles.contenedorpost}>
                <View style={{flexDirection:"row"}}>
                  <View>                  
                    {n.creador.imagen &&(
                      <Image source={{uri:n.creador.imagen}} style={{height:50,width:50,borderRadius:50,marginRight:10}}></Image>
                    )}
                  </View>
                  <View>
                    <Text>{n.creador.nombre } {n.noti.mensaje}</Text>
                    <Text>{n.post.titulo}</Text>
                    <Text>{n.post.descripcion}</Text>
                    {n.post.imagen&&(
                      <Image style={{width:100,height:100,borderRadius:20}} source={{uri:n.post.imagen}}></Image>
                    )}
                  </View>
                </View>
                <View>
                  <IconElipsis></IconElipsis>
                </View>
                
              </View>
              </Pressable>
             </Link>
              :null                           
            )
          }) 
            :null
          } 
          {notificaciontotal?.notislikes?.length>0?          
            notificaciontotal.notislikes.map((n,i)=>{
              return(               
               <Link asChild href={`/${n.tipo}/show/${n.contenido.id}`}>
                <Pressable>
                  <View key={i} style={styles.contendorlikes}>
                  <View style={{flexDirection:"row"}}>
                    <View>                  
                      {
                        n.creador.imagen&&(
                          <Image source={{uri:n.creador.imagen}} style={{height:50,width:50,borderRadius:50,marginRight:10}}></Image>
                        )
                      }
                    </View>
                    <View>
                      <Text>{n.noti.mensaje} a {n.creador.nombre}</Text>
                      <Text>{n.contenido.titulo}</Text>
                      {n.contenido.imagen&&(
                        <Image source={{uri:n.contenido.imagen}} style={{width:100,height:150,borderRadius:10}}></Image>
                      )}
                    </View>
                  </View>
                  <View><IconElipsis></IconElipsis></View>
                  </View>
                </Pressable>
               </Link>
                
              )
            })        
        :null        
        }
              
        { notificaciontotal?.notisfollow?.length>0?
          notificaciontotal?.notisfollow.map((n,i)=>{
            return(
             <Link href={`/Perfil/users/${n.user.id}`} asChild>
              <Pressable>
                 <View key={i} style={styles.contendorfollow}>
                  <View style={{flexDirection:"row"}}>
                  <View>                  
                    {n.user.imagen&&
                      (<Image source={{uri:n.user.imagen}} style={{height:50,width:50,borderRadius:50,marginRight:10}}></Image>)
                    }
                  </View>
                  <View>
                    <Text>{n.follow.mensaje} {n.user.nombre}</Text>
                    
                  </View>
                </View>
                 <View><IconElipsis></IconElipsis></View>
              </View>
              </Pressable>
             </Link>
            )
          })
          :null
        }
            </View>
            )
        :
        <View style={{alignSelf:"center",marginTop:20}}>
            <Text style={{fontWeight:"bold"}}>No hay notificaciones actualmente</Text>
        </View>}

        </View>
      </View>        
        
    </View>
    </ScrollView>
  </>
  )
}
const styles=StyleSheet.create({
  principal:{
    borderColor:"black",
    borderStyle:"solid",
      
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:2,
  },
  contenedorpost:{
    paddingTop:10,
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:10,
    flexDirection:'row',    
    borderColor:"black",
    borderStyle:"solid",
    borderTopWidth:2,
    justifyContent:"space-between",
    alignItems:"flex-start"
  },
  contendorlikes:{
    flexDirection:"row",
    borderColor:"black",
    paddingLeft:15,
    paddingRight:15,
    borderStyle:"solid",
    borderTopWidth:2,
    paddingTop:10,
    paddingBottom:10,
    justifyContent:'space-between'
  },
  contendorfollow:{
    flexDirection:"row",
    borderColor:"black",
    paddingLeft:15,
    paddingRight:15,
    borderStyle:"solid",
    borderTopWidth:2,    
    paddingTop:10,
    paddingBottom:10,
    justifyContent:'space-between'
  },
  acti:{
    marginTop:10,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  icon_acti:{
    borderRadius:50,
    borderWidth:2,
    borderStyle:'solid',
    borderColor:'purple',
    padding:10,
    marginRight:10,
    backgroundColor:'purple',
  },
  content_Acti:{
    
  }
})
