import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TextInput,Text, View, ScrollView, Pressable, Image, Button } from 'react-native'
import { IconActivity, IconDontSearch, IconSeach, IconUser } from '../../assets/Icons'
import Metas from '../../hooks/Metas'
import Habitos from '../../hooks/Habitos'
import Actividades from '../../hooks/Actividades'
import { Link, router, Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import usuarios from '../../hooks/usuarios'
import { useUser } from '../../components/UserContext'
import BusSearch from '../Buscador/bus'
import { useHistoryial } from '../../components/HistorialProvider'
import axios from 'axios'
import GetImage from '../../utils/GetImage'
import constantes from "expo-constants"
export default function Buscardor() {
    const {FectUsuarios,dataUser}=usuarios()
    const {FectMetas,metas}=Metas()
    const {FecthHabitos,habitos}=Habitos()
    const {FetchActividades,actividades}=Actividades()
    const [datosbuscados, setdatosbuscados] = useState("")
    //const [historial, sethistorial] = useState([])
    const [resultado, setresultado] = useState([])    
    const {user}=useUser()
    const navegar=useRouter()
    const {historialC}=useHistoryial()
    
    const EnviarSearch=async()=>{
        navegar.push({
            pathname:"/Buscador/bus",
            params:{entrada:datosbuscados}
        })
    }
    const [creador, setcreador] = useState([])
    const host=constantes.expoConfig.extra.host
    const MostCreador=async()=>{
        const {data}=await axios.get(`http://${host}:4000/usuarios/s/${user.id}`)
        setcreador(data)
    }
    useFocusEffect(
        useCallback(()=>{
            MostCreador()
        },[])
    )

    return (
   <>
   <ScrollView>
    
     <Stack.Screen options={{headerShown:false}}></Stack.Screen>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:60,}}>
        <View>
            <Image source={{uri:GetImage(creador.imagen)}} style={{width:50,borderRadius:50,height:50}}></Image>
        </View>
        <View style={styles.buscar}>
            <TextInput style={{padding:10,width:240,borderRadius:20}} onChangeText={text=>setdatosbuscados(text)} value={datosbuscados}  placeholder='buscar...'></TextInput>
            <Pressable onPress={(EnviarSearch)}>
                <IconSeach style={styles.icon_Search}></IconSeach>
            </Pressable>
        </View>
     </View>
   <View style={{flexDirection:'column',justifyContent:'space-around',margin:20}}>
        {historialC.length>0?
        historialC.map((h,i)=>{           
            return(
                    h.tipo=="Usuario"?
                    <Link key={i} href={`/Perfil/users/${h.id}`} asChild>
                    <Pressable>
                        <View style={styles.contendor_buscador} key={i}>
                            <View style={styles.box}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={{marginRight:10}}>
                                   <IconUser></IconUser> 
                                </View>                           
                                <View>
                                    <Text>{h.titulo}</Text>
                                <Text>{h.descripcion}</Text>
                                </View>
                            </View>
                            <View style={styles.box_tipe} >                                
                                 <Text style={{textAlign:'center',color:'white'}}>{h.tipo}</Text>
                            </View>                           
                            </View>
                            
                            
                        </View>
                    </Pressable>
                    </Link>
                    :        
                    <Link key={i} href={{pathname:`/${h.tipo}/show/${h.id}`,params:{publi:h.pubID}}} asChild>
                    <Pressable>
                        <View style={styles.contendor_buscador} key={i}>
                            <View style={styles.box}>
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={{marginRight:10}}>
                                    <IconActivity></IconActivity>
                                </View>
                            <View  >
                                <Text>Titulo: </Text>
                                <Text>{h.titulo}</Text>
                                
                            </View>
                             </View>
                            <View style={styles.box_tipe} >                                
                                 <Text style={{textAlign:'center',color:'white'}}>{h.tipo}</Text>
                            </View>
                           
                            </View>
                            
                            
                        </View>
                    </Pressable>
                   </Link>
                )
        })
        :
        <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
            <View style={{padding:10,borderRadius:99,backgroundColor:"white",borderWidth:2,borderColor:"black"}}>
                <IconDontSearch></IconDontSearch>
            </View>
            <View>
                <Text style={{fontWeight:"bold",}}>No se hizo ninguna busqueda</Text>
            </View>
        </View>
        }
   </View> 
   
   </ScrollView>
   </>
  )
}
const styles=StyleSheet.create({
    
    contendor_user:{
        
        display:'flex',
        alignSelf:'center',
        borderRadius:10,
        flexDirection:'row',
        marginBottom:10,
        alignItems:'center',
        width:350,
        height:65,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        alignContent:'center'
        
    },
    contenedor_no_datos:{
       
        margin:20,
        height:400,
        width:350,
        justifyContent:'center',
        alignSelf:'center',
    },
    no_datos:{
        fontWeight:'bold',
        textAlign:'center',      
    },
    buscar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        
        marginLeft:5,
        marginRight:5,
        
        padding:3,  
        borderStyle:'solid',
        borderWidth:2,
        width:290,
        borderColor:'black',
        borderRadius:50,        
    }
   
    ,
    input_buscar:{
        borderStyle:'solid',
        borderWidth:2,
        width:340,
        borderColor:'black',
        borderRadius:10,
    },
    contenedor_mostrar:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:2,
        borderStyle:'black',
        borderRadius:10,
        padding:10,
        alignSelf:'center',
        marginTop:10,
        marginBottom:10,
        width:350,
        height:65,
    },
    contendor_buscador:{
        
        alignSelf:'center',
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        borderRadius:10,
        width:340,
        height:70,
        margin:10,
        padding:10,
    },
    box:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    box_tipe:{
        display:'flex',
        backgroundColor:'purple',
        color:'white',
        padding:5,
        //width:90,
        //position:'absolute',
        //left:248,
        //top:-12,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderWidth:2,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }
})
