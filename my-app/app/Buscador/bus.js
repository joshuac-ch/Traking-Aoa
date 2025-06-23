import React, { useEffect, useState } from 'react'
import Habitos from '../../hooks/Habitos'
import Actividades from '../../hooks/Actividades'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import usuarios from '../../hooks/usuarios'
import Metas from '../../hooks/Metas'
import { useUser } from '../../components/UserContext'
import { IconActivity, IconBack, IconSeach, IconUser } from '../../assets/Icons'
import { useHistoryial } from '../../components/HistorialProvider'
import axios from 'axios'
import constantes from "expo-constants"
//MEJORAR ESTO Y EL BUSCARDOR.JS
export default function BusSearch() {
    const {entrada}=useLocalSearchParams()
      const {FectUsuarios,dataUser}=usuarios()
      //const {FectMetas,metas}=Metas()
      //const {FecthHabitos,habitos}=Habitos()
      //const {FetchActividades,actividades}=Actividades()
      const [datosbuscados, setdatosbuscados] = useState(entrada)
      const [historial, sethistorial] = useState([])
      const [resultado, setresultado] = useState([])    
      const {user}=useUser()
      const navegar=useRouter()
    //hacer el buscador global en si si es el mismo suario permitirle editar caso que sea otro o no coincia el id tencones que lo rediriga al show
    //el buscador se implmento el actividades global falta implementear el metas y habitos y redireccion como se menciona arriba! 
      const [busquedaNueva, setbusquedaNueva] = useState(null) //ver sino seriver no sirve pero igual asegurar quue no haya errores?
      const host=constantes.expoConfig.extra.host
      const [actividadesAll, setactividadesAll] = useState([])
      const ShowMetasOtherUsers=async()=>{
        const {data}=await axios.get(`http://${host}:4000/actividades/a`)
        setactividadesAll(data)
      }  
      useEffect(()=>{       
        ShowMetasOtherUsers()    
      },[])//ESTE NO TENIA EL CERRAR GENERO UN BUCLE
     const [metasAll, setmetasAll] = useState([])
     const ShowMetasAll=async()=>{
        const {data}=await axios.get(`http://${host}:4000/metas/a`)
        setmetasAll(data)
     }
     useEffect(()=>{
       
            ShowMetasAll()
        
     },[]) 
    useEffect(()=>{
            //FectMetas(),
            //FecthHabitos(),
            //FetchActividades(),
            FectUsuarios()
        },[])
    const [HabitosAll, setHabitosAll] = useState([])
    const ShowHabitosAll=async()=>{
        const {data}=await axios.get(`http://${host}:4000/habitos/a`)
        setHabitosAll(data)
    }   
    useEffect(()=>{
        
            ShowHabitosAll()
        
    },[])//ESTE NO TENIA EL CERRAR GENERO UN BUCLE SILENCIOSO   
    useEffect(()=>{
            if(datosbuscados.trim()!=""){
                
                const filtradoMetas=metasAll.filter((m)=>
                    m.titulo.toLowerCase().includes(datosbuscados.toLowerCase()))
                const filterActividad=actividadesAll.filter((a)=>
                    a.titulo.toLowerCase().includes(datosbuscados.toLowerCase()))
                const filterhabitos=HabitosAll.filter((h)=>
                    h.titulo.toLowerCase().includes(datosbuscados.toLowerCase()))
                const filtarUsers=dataUser.filter((u)=>
                    u.nombre!=user.nombre && u.nombre.includes(datosbuscados.toLowerCase())
                )
                const resultadosActuales=[
                  ...filtarUsers.map(a=>({...a,tipo:"Usuario"})),  
                  ...filtradoMetas.map(item=>({...item,tipo:'Metas'})),
                  ...filterActividad.map(item=>({...item,tipo:'Actividades'})),
                  ...filterhabitos.map(item=>({...item,tipo:'Habitos'}))
                
                ]
                setresultado(resultadosActuales)
    
                //if(palanca){
                //    sethistorial(resultadosActuales)
                //    setpalanca(false)
                //}
            }else{
                setresultado('')
            }  
              
        },[datosbuscados,metasAll,actividadesAll,HabitosAll])
     const {historialC, sethistorialC}=useHistoryial()  
        const guardarbusqueda=(id,titulo,tipo,descripcion)=>{
        //setpalanca(true)
        sethistorialC(prev=>{
            const existe=prev.some(item=>
                item.tipo===tipo&&
                item.titulo===titulo &&
                item.descripcion===descripcion
            )
            if(existe){
                return prev
            }
            //const nueva = { id, tipo, titulo, descripcion };
            //setbusquedaNueva(nueva)
            return [...prev,{id,tipo,titulo,descripcion}]           
    })}
    
          //ESTO CAMBIARLO POR UN HISTORY CONTEXT crear un contexto para traer los datos
       
    
  return (
   <>
    <ScrollView>
    
     <Stack.Screen options={{headerShown:false}}></Stack.Screen>
    <View style={styles.buscar}>
    <Link asChild href={"/Buscardor"}>
    <Pressable>
        <IconBack></IconBack>
    </Pressable>
    </Link>
    <TextInput onChangeText={text=>setdatosbuscados(text)} value={datosbuscados}  placeholder='buscar...'></TextInput>
    
    <IconSeach style={styles.icon_Search}></IconSeach>
   </View>
   <View style={{flexDirection:'row',justifyContent:'space-around',margin:20}}>
    <View>
        <Text>Actividades</Text>
    </View>
    <View>
        <Text>Usuarios</Text>
    </View>
   
   </View>
   <View>
    <View>
        
    </View>
    <View>
        {resultado.length>0?
        resultado.map((m,i)=>{
            return(
                m.tipo=="Usuario"?
                <Link key={i} href={`/Perfil/users/${m.id}`} asChild>
                    <Pressable onPress={()=>guardarbusqueda(m.id,m.nombre,m.tipo,m.correo)}>
                        <View style={styles.contendor_user}>
                            {m.imagen && m.imagen!=="" &&(
                                 <Image source={{uri:m.imagen}} style={{width:50,height:50,borderRadius:50,margin:10}}></Image>    
                            )}                           
                            <View>
                                <Text>{m.nombre}</Text>
                                <Text style={{fontWeight:'bold'}}>{m.correo}</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                :
                <Link  key={i} href={`/${m.tipo}/show/${m.id}`} asChild>
                    <Pressable onPress={()=>guardarbusqueda(m.id,m.titulo,m.tipo,m.descripcion)}>
                        <View style={styles.contenedor_mostrar}>
                            <View style={{marginLeft:10,marginRight:10}}>
                                <IconActivity></IconActivity>
                            </View>
                            <View>
                                 <Text>{m.tipo}</Text>
                                 <Text>{m.titulo}</Text>
                            </View>                            
                        </View>
                    </Pressable>
                </Link>
            )
        })
        :historial.length>0?
            historial.map((h,i)=>{
                
                //el buscardor de ahora sera global y buscarda los show ya no los nuestros 
                // si quieres buscar los tuyos podras buscarlos en cada categoria correspondiente
                //para mas adelante
                //la funcion compartir estara relaciondad con los show que se crearon para compartir y tambien compartir el perfil hal hacer click
                               
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
                    <Link key={i} href={`/${h.tipo}/${h.id}`} asChild>
                    <Pressable>
                        <View style={styles.contendor_buscador} key={i}>
                            <View style={styles.box}>
                             <View style={{flexDirection:'row',alignContent:'center'}}>
                                <View style={{marginRight:10}}>
                                <IconActivity></IconActivity>
                             </View>
                            <View  >
                                <Text>Titulo: </Text>
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
                )
            })
        :
        <View style={styles.contenedor_no_datos}>
            <Text style={styles.no_datos}>no ha datos</Text>
        </View>}
    </View>
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

        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        marginTop:55,

        padding:3,
                
        borderStyle:'solid',
        borderWidth:2,
        width:350,
        borderColor:'black',
        borderRadius:10,        
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
        width:350,
        height:100,
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


