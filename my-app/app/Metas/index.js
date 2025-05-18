import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'
import Metas from '../../hooks/Metas'
import { IconAdd } from '../../assets/Icons'
import { Link } from 'expo-router'

export default function index() {
  const {user}=useUser()
  const {FectMetas,metas}=Metas()  
  useEffect(()=>{
    FectMetas()
  },[])
  return (
    <ScrollView>
        <View >
      <View style={styles.contendorHeader}>
          <Text className='p-4'>Metas del usuario {user.nombre}</Text>
          <Link href={"/Metas/create"} asChild> 
        <Pressable>
              <IconAdd></IconAdd>
        </Pressable>
          </Link>
      </View>
    <View>
    {metas!=null?
    <View>
        {metas.map((m)=>{
            return(
                <View style={styles.contenedorPrincipal} key={m.id}>
                    <View>
                        <View>
                            <Text>Titulo: </Text>
                            <Text>{m.titulo}</Text>
                        </View>
                        <View>
                            <Text>Descripcion: </Text>
                            <Text>{m.descripcion}</Text>
                        </View>
                        <View>
                            <Text>Proceso</Text>
                            <Text style={styles.barra}></Text>
                        </View>
                    </View>
                    <View>
                        <Text>Meta: {m.meta_total}</Text>
                        <Text>Fecha limite: </Text>
                        <Text>{m.fecha_limite}</Text>
                    </View>
                </View>
            )
        })}
    </View>
    :<Text>No se encontraron datos</Text>}
    </View>
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    contendorHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:10
    },
    contenedorPrincipal:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        margin:10,
        borderWidth:2,
        borderStyle:'solid',
        borderColor:'black',
        borderRadius:10
    },
    barra:{
        width:100,
        borderRadius:50,
        backgroundColor:'purple'
    }
})