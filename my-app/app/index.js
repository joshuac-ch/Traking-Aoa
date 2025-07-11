import React from 'react'
import AppPrincipal from '../app/Login/app'
import { StatusBar, StyleSheet, View } from 'react-native'

export default function Index() {
  //SE CONSIDERA ELIMINAR ESTE 
  return (
    <>
    <View style={styles.container}>
    <StatusBar style="auto" />
    <AppPrincipal></AppPrincipal>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',   
    width:400,
    justifyContent: 'center',
  },
});

