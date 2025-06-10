import axios from 'axios'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import constantes from "expo-constants"
import Actividades from '../../../hooks/Actividades'

export default function userDiferent() {
    const [UserDiferent, setUserDiferent] = useState([])
    const {id}=useLocalSearchParams()
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
    useEffect(()=>{
        if(id!=null){
           const ShowActividadUser=async()=>{
            const {data}=await axios.get(`http://${host}:4000/actividades/${id}`)
            setdataActividadesOtherUser(data)
            
        }
        ShowActividadUser()       
        }
    },[id])    
    const [dataHabitosAnother, setdataHabitosAnother] = useState([])
    useEffect(()=>{
        if(id!=null){
            const showHabitosUser=async()=>{
                const {data}=await axios.get(`http://${host}:4000/habitos/${id}`)
                setdataHabitosAnother(data)
            }
        showHabitosUser()
        }

    },[id])

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
            <Text>390</Text>
            <Text>Siguiendo</Text>
        </View>
        <View style={styles.box}>
            <Text>322K</Text>
            <Text>Seguidores</Text>
        </View>
        <View style={styles.box}>
            <Text>4</Text>
            <Text>Me gusta</Text>
        </View>
    </View>
    <View style={styles.contenedor_edit}>
        <View style={styles.contenedor}>
            <Pressable onPress={()=>navegar.push(`/Perfil/${UserDiferent.id}`)}>
                <Text>Siguiendo</Text>
            </Pressable>
        </View>
        <View style={styles.contenedor}>
            <Pressable>
                <Text>Compartir Perfil</Text>
            </Pressable>
        </View>      
        
    </View>
   
   </View>
   {/*No quedamos aqui revisar que corra bien  */}
    <View>
        <Text style={{textAlign:'center'}}>Actividades</Text>
     </View>
   <View style={{display:'flex',justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
    
    {dataActividadesOtherUser.length>0?
    dataActividadesOtherUser.map((a,i)=>{
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
    :<Text style={{fontWeight:'bold',fontSize:25}}>No hay datos de actividades Actualmente </Text>}
   </View>
   <View>
        <Text style={{textAlign:'center'}}>Habitos</Text>
   </View>
   <View style={{display:'flex',justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
        {dataHabitosAnother.length>0?
        dataHabitosAnother.map((h,i)=>{
            return(
                <Link href={"habitos"} asChild key={i}>
                    <Pressable>
                        <View style={styles.proyecto_c}>
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                                <Image source={{uri:h.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{h.titulo.length>18?h.titulo.slice(0,15)+"...":h.titulo}</Text>
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
        <Text style={{textAlign:'center'}}>Metas</Text>
   </View>
   <View  style={{display:'flex',flexDirection:'row',justifyContent:'center',flexWrap:'wrap'}}>
        {dataMetasAnother.length>0?
        dataMetasAnother.map((m,i)=>{
            return(
                <Link asChild href={"/metas"} key={i}>
                    <Pressable>
                        <View style={styles.proyecto_c}>
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                                <Image source={{uri:m.imagen}} style={{width:133,height:124,borderStyle:'solid',borderTopLeftRadius:3,borderTopRightRadius:3}}></Image>
                                <View style={styles.div_c_body}>
                                    <Text>{m.titulo.length>18?m.titulo.slice(0,15)+"...":m.titulo}</Text>
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