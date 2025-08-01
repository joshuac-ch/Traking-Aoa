import axios from 'axios'
import { Link, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import constantes from "expo-constants"
import Actividades from '../../../hooks/Actividades'
import { useHistoryial } from '../../../components/HistorialProvider'
import { useUser } from '../../../components/UserContext'
import { IconActivity, IconHeart } from '../../../assets/Icons'
import LoveUser from "./LoveUser.js"

export default function UserDiferent() {
    const [UserDiferent, setUserDiferent] = useState([])
    const {id}=useLocalSearchParams()
    const {user}=useUser()
    const host=constantes.expoConfig.extra.host
    const ShowUsers=async()=>{

       const {data}= await axios.get(`http://${host}:4000/usuarios/s/${id}`)
        setUserDiferent(data)
    }
    useEffect(()=>{
        if(id){
            ShowUsers()
        }
    },[])
    //-----------------------------------------------------------------------------
    const [dataActividadesOtherUser, setdataActividadesOtherUser] = useState([])
    //useEffect(()=>{
    //  
    //     const ShowActividadUser=async()=>{
    //      const {data}=await axios.get(`http://${host}:4000/actividades/${id}`)
    //      setdataActividadesOtherUser(data)
    //      
    //  
    //  ShowActividadUser()       
    //  }
    //},[id])
    const MostratActividadesPubOther=async()=>{
        const {data} =await axios.get(`http://${host}:4000/publicacion/actividades/${id}`)
        setdataActividadesOtherUser(data)
    }
    useFocusEffect(
        useCallback(()=>{
            if(id){
                MostratActividadesPubOther()
            }
        },[id])
    )    
    //aqui quedamos falta mejorar habitos y ber que funcione los comnetarios al buscar un perfil
    const [dataHabitosAnother, setdataHabitosAnother] = useState([])
    const showHabitosUser=async()=>{
                const {data}=await axios.get(`http://${host}:4000/publicacion/habitos/${id}`)
                setdataHabitosAnother(data)
    }
    useFocusEffect(useCallback(()=>{
        if(id){          
        showHabitosUser()
        }
    },[id]))

    const [dataMetasAnother, setdataMetasAnother] = useState([])
    useEffect(()=>{
        if(id!=null){
            const showMetasUser=async()=>{
                const {data}=await axios.get(`http://${host}:4000/metas/${id}`)
                setdataMetasAnother(data)
            }
            showMetasUser()            
        }                
    },[id])
    const {setusuarioFollowID}=useHistoryial()
    
    const [NewSeguidorForm, setNewSeguidorForm] = useState({
        seguidor_id:user.id,
        seguido_id:id,
        fecha:new Date(),
        estado:true
    })
    //pasarle a la variable seeguidor nestra valor de estadoActalFollow
    const [estadoActualFollow, setestadoActualFollow] = useState(false)
    const GetFollow=async()=>{
        const {data}=await axios.get(`http://${host}:4000/seguidores/actividadesfollow/estatus/${user.id}/${id}`)
            setestadoActualFollow(data.estado)
                 
    }
    
  useFocusEffect(
  useCallback(() => {
    if (user.id && id) {
      GetFollow()                
    }
  }, [user.id, id])
)
    const [countSeguidores, setcountSeguidores] = useState(1)
    const CountSeguidores=async()=>{
        const {data}=await axios.get(`http://${host}:4000/seguidor/count/${id}`)
        setcountSeguidores(data)
    }
    useFocusEffect(
        useCallback(()=>{
            if(id){
                CountSeguidores()
            }
        },[id])
    )
    const [countLovePub, setcountLovePub] = useState(0)
    const CountLove=async()=>{
        const {data}=await axios.get(`http://${host}:4000/publicacion/loves/conteo/${id}`)
        setcountLovePub(data)
    }
    useFocusEffect(
        useCallback(()=>{
            CountLove()
        })
    )
    
    const {seguidor,setseguidor}=useHistoryial()
    const PressSeguir=async()=>{
            if(!seguidor){
                await axios.post(`http://${host}:4000/seguidores/follow/`,NewSeguidorForm)
                setseguidor(true)
                setusuarioFollowID(id)
                setestadoActualFollow(true) 
                ToastAndroid.show("siguiendo a este usuario",ToastAndroid.BOTTOM)   
                
            }else{
                await axios.delete(`http://${host}:4000/seguidores/actidadesfollow/delete/${user.id}/${id}`,NewSeguidorForm) 
                setseguidor(false)
                setestadoActualFollow(false)               
                
            }
            await CountSeguidores()
            //ToastAndroid.show("Usted comienza a seguir a este usuario",ToastAndroid.BOTTOM)
           
        
    
    }
    const [myfollows, setmyfollows] = useState([])
    const Myfollows=async()=>{
        const {data}=await axios.get(`http://${host}:4000/seguidores/count/${id}`)
        setmyfollows(data)
    }
    useFocusEffect(
        useCallback(()=>{
            if(id){
                Myfollows()
            }
        },[id])
    )
    const [estadouser, setestadouser] = useState("actividades")
    const [mostrarMetas, setmostrarMetas] = useState(false)
    return (    
    <>
        
   <ScrollView>
    <Stack.Screen options={{headerShown:true}}></Stack.Screen>
   <View style={styles.contenedor_principal}>
    <View >
        <Text >{UserDiferent.nombre}</Text>
    </View>
    <View style={{alignItems:'center'}}>
        <Image style={styles.image} source={{uri:UserDiferent.imagen}}></Image>
        <Text >{UserDiferent.correo}</Text>
    </View>
    <View style={styles.contenedor_sub}>
        <View style={styles.box}>
            <Text>{myfollows}</Text>
            
            <Text>Siguiendo </Text>
        </View>
        <View style={styles.box}>
            <Text>{countSeguidores}</Text>
            <Text>Seguidores</Text>
        </View>
        <View style={styles.box}>
            <Text>{countLovePub}</Text>
            <Text>Me gusta</Text>
            
        </View>
    </View>
    <View style={styles.contenedor_edit}>
        <View style={styles.contenedor}>
            <Pressable onPress={PressSeguir} >
                
                <Text>{estadoActualFollow?"Siguiendo":"Seguir"}</Text>
            </Pressable>
            {/*
            <Pressable onPress={()=>navegar.push(`/Perfil/${UserDiferent.id}`)}>
                <Text>Siguiedndo</Text>
            </Pressable> SE PODRIA SAR PARA ENVIAR MENSAJES
            */}
        </View>
        <View style={styles.contenedor}>
            <Pressable>
                <Text>Compartir Perfil</Text>
            </Pressable>
        </View>      

       
    </View>
               
   </View>
    <View style={{flexDirection:'row',justifyContent:"space-around",margin:10}}>
        <Pressable onPress={()=>setestadouser("actividades")}>
            <View>
                <IconActivity></IconActivity>
            </View>
        </Pressable>
        <Pressable onPress={()=>setestadouser("loves")}>
            <View>
                <IconHeart></IconHeart>
            </View>
        </Pressable>
    </View> 
   {/*No quedamos aqui revisar que corra bien  */}
   {estadouser=="actividades"?
   <View>
   
    <View>
        <Text style={{textAlign:'center'}}>Actividades</Text>
     </View>
   <View style={{display:'flex',justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
    
    {dataActividadesOtherUser.length>0?
    dataActividadesOtherUser.map((a,i)=>{
        return(
            <Link key={i} href={{pathname:`/Actividades/show/${a.rutina.id}`,params:{publi:a.pub.id}}} asChild>
                                  <Pressable>
                                     <View style={styles.proyecto_c}>
                                        
                                        <View style={{display:'flex',justifyContent:'space-between'}}>
                                           
                                           {a.rutina.imagen&&(
                                            <Image source={{uri:a.rutina.imagen}} style={{width:133,height:150,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                            )}
                                           <View style={styles.div_c_body}>
                                               
                                                <Text style={{paddingLeft:5}}>{a.rutina.titulo.length>15?a.rutina.titulo.slice(0,12)+"...":a.rutina.titulo}</Text>
                                            </View>
                                             
                                        </View>
                                   </View> 
                                  </Pressable>
                                  </Link>
        )
    })
    :<Text style={{fontWeight:'bold',fontSize:15}}>No hay publicaciones de actividades Actualmente </Text>}
   </View>
   <View>
        <Text style={{textAlign:'center'}}>Habitos</Text>
   </View>
   <View style={{display:'flex',justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
        {dataHabitosAnother.length>0?
        dataHabitosAnother.map((h)=>{
            return(
                <Link href={{pathname:`/Habitos/show/${h.rutina.id}`,params:{publi:h.pub.id}}} asChild key={h.pub.id}>
                    <Pressable>
                        <View style={styles.proyecto_c}>
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                                {h.rutina.imagen&&(
                                    <Image source={{uri:h.rutina.imagen}} style={{width:133,height:150,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                )}
                                <View style={styles.div_c_body}>
                                    <Text style={{paddingLeft:5}}>{h.rutina.titulo.length>15?h.rutina.titulo.slice(0,12)+"...":h.rutina.titulo}</Text>
                                </View>
                            </View>
                        </View>    
                    </Pressable>                
                </Link>             
                
            )
        })
        :<Text style={{fontWeight:'bold',fontSize:15}}>No hay datos de habitos Actualmente</Text>}
   </View>
   <View>
    {mostrarMetas?
    <View>
        <View>
            <Text style={{textAlign:'center'}}>Metas</Text>
        </View>
        <View  style={{display:'flex',flexDirection:'row',justifyContent:'center',flexWrap:'wrap'}}>
                {dataMetasAnother.length>0?
                dataMetasAnother.map((m,i)=>{
                    return(
                        <Link asChild href={`/Metas/show/${m.id}`} key={i}>
                            <Pressable>
                                <View style={styles.proyecto_c}>
                                    <View style={{display:'flex',justifyContent:'space-between'}}>
                                        {m.imagen&&(
                                            <Image source={{uri:m.imagen}} style={{width:133,height:150,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                        )}
                                        <View style={styles.div_c_body}>
                                            <Text style={{paddingLeft:5}}>{m.titulo.length>15?m.titulo.slice(0,12)+"...":m.titulo}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        </Link>
                    )
                })
                :
                    <Text style={{fontWeight:'bold',fontSize:15}}>No hay datos de Metas Actualmente</Text>
                }
        </View>
    </View>
    :""}
   </View>
   

   </View>
   :
   <LoveUser></LoveUser>
   }
 {/*
 <View>
    <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                {alldata!=null?
               alldata.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               
                               <Image source={{uri:a.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{a.titulo.length>18?a.titulo.slice(0,15)+"...":a.titulo}</Text>
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
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                {dataActividades!=null?
               dataActividades.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               <Image source={{uri:a.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{a.titulo.length>18?a.titulo.slice(0,15)+"...":a.titulo}</Text>
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
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                {dataHabitos!=null?
               dataHabitos.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                              <Image source={{uri:a.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{a.titulo.length>18?a.titulo.slice(0,15)+"...":a.titulo}</Text>
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
         <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                {dataMetas!=null?
               dataMetas.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               <Image source={{uri:a.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{a.titulo.length>18?a.titulo.slice(0,15)+"...":a.titulo}</Text>
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
 */}
    </ScrollView>   
   </>
  )
}
const styles=StyleSheet.create({
    proyecto_title:{
        textAlign:'center',
        padding:20,
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
        width:135,
        height:180,
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