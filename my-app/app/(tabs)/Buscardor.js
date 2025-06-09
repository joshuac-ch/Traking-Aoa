import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput,Text, View, ScrollView, Pressable, Image } from 'react-native'
import { IconSeach } from '../../assets/Icons'
import Metas from '../../hooks/Metas'
import Habitos from '../../hooks/Habitos'
import Actividades from '../../hooks/Actividades'
import { Link, Stack } from 'expo-router'
import usuarios from '../../hooks/usuarios'
import { useUser } from '../../components/UserContext'

export default function Buscardor() {
    const {FectUsuarios,dataUser}=usuarios()
    const {FectMetas,metas}=Metas()
    const {FecthHabitos,habitos}=Habitos()
    const {FetchActividades,actividades}=Actividades()
    const [datosbuscados, setdatosbuscados] = useState("")
    const [historial, sethistorial] = useState([])
    const [resultado, setresultado] = useState([])    
    const {user}=useUser()
    useEffect(()=>{
        FectMetas(),
        FecthHabitos(),
        FetchActividades(),
        FectUsuarios()
    },[])
    useEffect(()=>{
        if(datosbuscados.trim()!=""){
            const filtrado=metas.filter((m)=>
                m.titulo.toLowerCase().includes(datosbuscados.toLowerCase()))
            const filterActividad=actividades.filter((a)=>
                a.titulo.toLowerCase().includes(datosbuscados.toLowerCase()))
            const filterhabitos=habitos.filter((h)=>
                h.titulo.toLowerCase().includes(datosbuscados.toLowerCase()))
            const filtarUsers=dataUser.filter((u)=>
                u.nombre!=user.nombre && u.nombre.includes(datosbuscados.toLowerCase())
            )
            const resultadosActuales=[
              ...filtarUsers.map(a=>({...a,tipo:"Usuario"})),  
              ...filtrado.map(item=>({...item,tipo:'Metas'})),
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
    },[datosbuscados,metas,actividades,habitos])
    const guardarbusqueda=(id,titulo,tipo,descripcion)=>{
        //setpalanca(true)
        
        sethistorial(prev=>{
            const existe=prev.some(item=>
                item.tipo===tipo&&
                item.titulo===titulo &&
                item.descripcion===descripcion
            )
            if(existe){
                return prev
            }
            return [...prev,{id,tipo,titulo,descripcion}]            
    })        
    }
    return (
   <>
   <ScrollView>
    
     <Stack.Screen options={{headerShown:false}}></Stack.Screen>
    <View style={styles.buscar}>
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
                    <Pressable onPress={()=>guardarbusqueda(m.id,m.titulo,m.tipo,m.descripcion)}>
                        <View style={styles.contendor_user}>
                            <Image source={{uri:m.imagen}} style={{width:50,height:50,borderRadius:50,margin:10}}></Image>
                            <View>
                                <Text>{m.nombre}</Text>
                                <Text style={{fontWeight:'bold'}}>{m.correo}</Text>
                            </View>
                        </View>
                    </Pressable>
                </Link>
                :
                <Link  key={i} href={`/${m.tipo}/${m.id}`} asChild>
                    <Pressable onPress={()=>guardarbusqueda(m.id,m.titulo,m.tipo,m.descripcion)}>
                        <View style={styles.contendor_buscador}>
                            <Text>{m.tipo}</Text>
                            <Text>Titulo: </Text>
                            <Text>{m.titulo}</Text>
                            <Text>Descripcion: </Text>
                            <Text>{m.descripcion}</Text>
                        </View>
                    </Pressable>
                </Link>
            )
        })
        :historial.length>0?
            historial.map((h,i)=>{
                return(
                   <Link key={i} href={`/${h.tipo}/${h.id}`} asChild>
                    <Pressable>
                        <View style={styles.contendor_buscador} key={i}>
                            <View style={styles.box}>
                            <View  style={styles.box}>
                                <Text>Titulo: </Text>
                                <Text>{h.titulo}</Text>
                            </View>
                            <View style={styles.box_tipe} >
                                
                                 <Text style={{textAlign:'center',color:'white'}}>{h.tipo}</Text>
                            </View>
                           
                            </View>
                            
                            <Text>Descripcion: </Text>
                            <Text>{h.descripcion}</Text>
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
    contendor_buscador:{
        
        alignSelf:'center',
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        borderRadius:10,
        width:350,
        height:130,
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
