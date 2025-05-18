import React from 'react'
import AppPrincipal from '../components/app'
import { StatusBar, StyleSheet, View } from 'react-native'

export default function index() {
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

