import React from 'react'
import { Text, View } from 'react-native'
import { IconDontHeard } from '../../../assets/Icons'

export default function LoveUser() {
  return (
   <>
   <View style={{marginTop:20}}>
        <View style={{flexDirection:"row",alignSelf:"center", borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,borderWidth:2,borderColor:"#4b4b4b",padding:10,borderStyle:"solid"}}>
           <IconDontHeard color='white'></IconDontHeard>
        </View>
        <Text style={{textAlign:"center",color:"white",paddingTop:5}}>No tiene permiso para ver</Text>
   </View>
   </>
  )
}
