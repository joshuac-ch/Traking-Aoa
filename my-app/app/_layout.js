import React from 'react'
import App from '../App'
import { router, Slot, Stack } from 'expo-router'
import { UserProvider } from '../components/UserContext'
import HistorialProvider from '../components/HistorialProvider'

export default function _layout() {
  return (
   <>
   <UserProvider>
     <HistorialProvider>
       <Stack screenOptions={{title:'Home'}}>
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
     </HistorialProvider>
     { /* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />SI eliminamos y ponemos header:false las rutas a actividades habitos y metas desaparecen? */}
   </UserProvider>
   </>
  )
}
