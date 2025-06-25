import React, { use, useCallback, useEffect, useState } from 'react'
import { Button, Image, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'

import PagerView from 'react-native-pager-view'
import { Link, Stack, Tabs, useFocusEffect, useRouter } from 'expo-router'
import { IconAdd, IconElipsis, IconHeart, IconLeft, IconReply } from '../../assets/Icons'
import constantes from 'expo-constants'
import axios from 'axios'
import { useHistoryial } from '../../components/HistorialProvider'
import { ToastAndroid } from 'react-native'
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
    //IMPORTANTE
    //crear una tabla seguidores en esta tabla cada queu hagamos click see agreagara a nosotros como seguidor nuestro y aparezca
    // en el principal solo el crear el mostrar y el delete
    //al elimint osea clickear en el boton dejar de seguir se elimina de nuestra lista esto para que se guarde en la base de datos 
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
     
    const ChangeEmcoicon=async()=>{
      setemocionSeleccionada(prev=>({
        ...prev,
        nivel:e.emo,
        emocion:e.des,
        usuario_id:user.id
        
      }))
    }
    
    //crear notificacions si se cmple o no determinada tarea
    //Notificaciones push
    //Envían un recordatorio (“¿Tomaste agua hoy?”).
    //La notificación puede tener acciones (ej: botón “Sí” que marca como hecho directamente). 
    //mostrar datos para la persona correcta en habito meta y acti mejorar las rutas
  return (
      <ScrollView>
        
       
     <Stack.Screen options={{headerShown:false}}></Stack.Screen>
        <View key={miuser.id}  style={styles.contenedor_perfil}>
        <View style={{flexDirection:'row'}}>
          <Image style={styles.image} source={{uri:miuser.imagen}}></Image>
        <View style={{justifyContent:'center'}}>
            <Text style={{fontWeight:'bold'}}>{miuser.nombre} {miuser.apellido}</Text>
            <Text >{miuser.correo}</Text>
        </View>
        </View>
        <View>
            <Link href={"/configuracion"} asChild>
              <Pressable style={({pressed})=>[
                {
                  backgroundColor:pressed?'#fff':"red",
                  borderRadius:50,padding:10
                }
              ]} >
                <IconElipsis></IconElipsis>
              </Pressable>
            </Link>
        </View>
        
    </View>
       
   <View style={styles.contenedorCarrusel}>
      <PagerView style={{ flex: 1 }} initialPage={0}>
        <View key="1" style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={styles.imagenCarrusel} source={{uri:'https://i.pinimg.com/736x/48/5a/d2/485ad255cde385445e8ae312e1a99c97.jpg'}}></Image>
           <View style={styles.TextCarrusel}>
            <Text>Proyecto 1 Mision</Text>
          </View>
        </View>
        <View key="2" style={{justifyContent:'center',alignItems:'center'}} >
            <Image style={styles.imagenCarrusel} source={{uri:'https://i.pinimg.com/736x/d2/c4/d5/d2c4d52b69f3d40c38ed12aa9870c2c5.jpg'}}></Image>
          <View style={styles.TextCarrusel}>
            <Text>Proyecto 2 Mision</Text>
          </View>
        </View>
        <View key="3" style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={styles.imagenCarrusel} source={{uri:'https://i.pinimg.com/736x/c6/03/91/c60391cd96ba2d9b44c02276e1a96baf.jpg'}}></Image>
          <View style={styles.TextCarrusel}>
            <Text>Proyecto 3 Mision</Text>
          </View>
        </View>
      </PagerView>      
    </View>
    <View style={styles.vista_acti}>
      <View style={styles.contenedorpresabe}>
        <Link href={"Actividades/ActividadesDiarias"} asChild>
          <Pressable >
            <View style={styles.btn_router}>
              <IconLeft></IconLeft>
              <Text style={{marginLeft:10}}>Ir a actividades</Text>
            </View>
            
          </Pressable>
        </Link>
        <Link href={"/Actividades/Create"} asChild>
          <Pressable>
            <View>
              <IconAdd></IconAdd>
            </View>
          </Pressable>
        </Link>
      </View>
     <View  style={styles.contenedorpresabe}>
       <Link href={"/Habitos"} asChild>
          <Pressable>
            <View style={styles.btn_router}>
               <IconLeft></IconLeft>
               <Text style={{marginLeft:10}}>Ir a habitos</Text>
            </View>
            
          </Pressable>
       </Link>
        <Link href={"/Habitos/create"} asChild>
        <Pressable>
          <View>
            <IconAdd></IconAdd>
          </View>
        </Pressable>
      </Link>
     </View>

      <View style={styles.contenedorpresabe}>
        <Link href={"/Metas/"} asChild>
        <Pressable >
             <View  style={styles.btn_router}>
                <IconLeft ></IconLeft>
                <Text style={{marginLeft:10}}>Ir a metas</Text>
            </View>
            
        </Pressable>
      </Link>
      <Link href={"/Metas/create"} asChild>
        <Pressable>
          <View>
            <IconAdd></IconAdd>
          </View>
        </Pressable>
      </Link>
      </View>

      
      <Link href={"/centro"} asChild>
      <Pressable>
        <View>
        <Text>Analisis inteligente</Text>
      </View>
      </Pressable>
      </Link>
      <View>
        {
       dataSeguidor.length>0?
        dataSeguidor.map((d,i)=>{
          
          
          return(
                     
           <View key={i} style={styles.modelo_pub}>
              
            <View style={{margin:10}}>
             <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
               <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <View>
                  <Image source={{uri:d.creador.imagen}} style={{width:50,height:50,borderRadius:50,marginRight:15}}></Image>
                </View>
                <View>
                  <Text>{d.creador.nombre}</Text>
                  <Text style={{fontWeight:'bold'}}>{d.creador.correo}</Text>
                </View>
              </View>
              <View>
                <IconElipsis></IconElipsis>
              </View>
             </View>
              <Text>{d.titulo}</Text>
              <Text>{d.descripcion}</Text>
            </View>
              <Image style={{width:200,height:250,borderRadius:20,alignSelf:'center'}} source={{uri:d.imagen}}></Image>
              <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
                <IconHeart></IconHeart>
                <Text  style={{marginLeft:10}}>Me encanta</Text>
                
              </View>
              <View style={{flexDirection:'row'}}>
                <IconReply></IconReply>
                <Text style={{marginLeft:10}}>Compartir</Text>
              </View>
              </View>  
          </View>
         
        
          )
        })
       :<Text>No esta suscrito a ningun canal</Text>
        }
      </View>
     

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
    margin:10,
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
        alignSelf:'flex-start',
        display:'flex',
        justifyContent:'center',     
        height:150,
        width:250,        
        
    },
    TextCarrusel:{
      width:180,
      padding:10,
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
        width:180,
        height:100,
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