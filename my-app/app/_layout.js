import React from 'react'
import App from '../App'
import { router, Slot, Stack } from 'expo-router'
import { UserProvider } from '../components/UserContext'

export default function _layout() {
  return (
   <>
   <UserProvider>
      <Stack screenOptions={{title:'Home'}}>
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>{ /* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />SI eliminamos y ponemos header:false las rutas a actividades habitos y metas desaparecen? */}
   </UserProvider>
   </>
  )
}
