import React from 'react'
import App from '../App'
import { Text } from 'react-native'
import { Slot, Stack } from 'expo-router'
import { UserProvider } from '../components/UserContext'

export default function _layout() {
  return (
   <>
   <UserProvider>
    <Stack></Stack>
   </UserProvider>
   </>
  )
}
