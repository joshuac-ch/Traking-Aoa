import React from 'react'
import AppPrincipal from '../app/Login/app'
import { StatusBar, StyleSheet, View } from 'react-native'

export default function Index() {
  //SE CONSIDERA ELIMINAR ESTE 
  return (
    <>
    <View style={styles.container}>
    <StatusBar style="auto" backgroundColor={"#131313"}/>
    <AppPrincipal style={{backgroundColor:"#131313"}}></AppPrincipal>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',   
    width:400,
    justifyContent: 'center',
  },
});

