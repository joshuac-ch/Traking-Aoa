import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { useUser } from '../../components/UserContext'

export default function DetalleUser() {
  const {id}=useLocalSearchParams()
  const {user}=useUser()
  const imagenURL = `http://192.168.18.31:8080/uploads/${user.imagen}`;
 
    return (
    <>
    <View>
        <Text>Perfil {imagenURL}</Text>
    </View>
    </>
  )
}
