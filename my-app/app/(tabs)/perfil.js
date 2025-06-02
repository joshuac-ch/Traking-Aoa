import React, { useCallback, useEffect, useState } from 'react'
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import { Link, Stack, useFocusEffect, useRouter } from 'expo-router'
import constantes from 'expo-constants' 
import axios from 'axios'
import Metas from '../../hooks/Metas'
import Actividades from '../../hooks/Actividades'
import Habitos from '../../hooks/Habitos'
export default function perfil() {
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
    useEffect(()=>{
            FectMetas(),
        FecthHabitos(),
        FetchActividades()
    },[])
    
    useEffect(()=>{       
            if(metas.length>0 && habitos.length>0 && actividades.length>0){
                const tododata=[
                    ...metas.map((m)=>({...m,type:'Metas'})),
                    ...habitos.map((h)=>({...h,type:'Habitos'})),
                    ...actividades.map((a)=>({...a,type:'Actividades'}))
                ] 
                setalldata(tododata)
                setdataActividades(actividades,{type:"Actividades"})
                setdataMetas(metas,{type:'Metas'})
                setdataHabitos(habitos,{type:"Habitos"})
                
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
 <View>
    <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                {alldata!=null?
               alldata.map((a,i)=>{
                    return(
                      <Link key={i} href={`/${a.type}/${a.id}`} asChild>
                      <Pressable>
                         <View style={styles.proyecto_c}>
                            
                            <View style={{display:'flex',justifyContent:'space-between'}}>
                               <ImageBackground source={{uri:a.imagen}} style={{width:130,height:120}}>
                                    {/*<View style={styles.div_c_header}>
                                        <Text style={{color:'black'}}>{a.type}</Text>
                                    </View>*/}
                               </ImageBackground>
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
                               <ImageBackground source={{uri:a.imagen}} style={{width:130,height:120}}>
                                    {/*<View style={styles.div_c_header}>
                                        <Text style={{color:'black'}}>{a.type}</Text>
                                    </View>*/}
                               </ImageBackground>
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
                               <ImageBackground source={{uri:a.imagen}} style={{width:130,height:120}}>
                                    {/*<View style={styles.div_c_header}>
                                        <Text style={{color:'black'}}>{a.type}</Text>
                                    </View>*/}
                               </ImageBackground>
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
                               <ImageBackground source={{uri:a.imagen}} style={{width:130,height:120}}>
                                    {/*<View style={styles.div_c_header}>
                                        <Text style={{color:'black'}}>{a.type}</Text>
                                    </View>*/}
                               </ImageBackground>
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
       
        <View style={styles.proyecto}>
              
            <View style={{display:'flex',flexDirection:'row'}}>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text >Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
                <View style={styles.proyecto_c}>
                    <View style={styles.div_c}><Text>Type</Text></View>
                </View>
            </View>
            
            
        </View>
        
    </View> 
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
        borderWidth:2,
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
        backgroundColor:'#fff',
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