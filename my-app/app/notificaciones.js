import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { IconHome, IconLeft, IconSeach, IconUser } from '../assets/Icons'

export default function notificaciones() {
  return (
    <>
    <View className='m-4'>
        <View>
          <Text>Bandeja de Entrada</Text>
        </View>
        <View>
            <View style={styles.acti}>
              <View style={{flexDirection:'row'}}>
                <View style={styles.icon_acti}>
                  <IconUser></IconUser>
                </View>
                <View>
                <Text>Actividad</Text>
                <Text>KenNeth de contactos</Text>
              </View> 
              </View>
              
              <View>
                <Text>+1</Text>
              </View>
            </View>
              <View style={styles.acti}>
              <View style={{flexDirection:'row'}}>
                <View style={styles.icon_acti}>
                  <IconHome></IconHome>
                </View>
                <View>
                <Text>Home</Text>
                <Text>Revisar ajustes</Text>
              </View> 
              </View>
              
              <View>
                <IconLeft></IconLeft>
              </View>
            </View>
              <View style={styles.acti}>
              <View style={{flexDirection:'row'}}>
                <View style={styles.icon_acti}>
                  <IconSeach></IconSeach>
                </View>
                <View>
                <Text>Actividad</Text>
                <Text>Hay una actividad pendiente</Text>
              </View> 
              </View>
              
              <View>
                <Text>+1</Text>
              </View>
            </View>                
        </View>
    </View>
  </>
  )
}
const styles=StyleSheet.create({
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
