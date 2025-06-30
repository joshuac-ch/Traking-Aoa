import { Tabs } from 'expo-router'
import React from 'react'
import { IconBell, IconHome, IconSeach, IconUser } from '../../assets/Icons'

export default function _layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'purple',tabBarLabelStyle: { fontSize: 12 } }}>
        
        <Tabs.Screen name='Panel' options={{tabBarLabel:'Home',tabBarIcon:()=><IconHome></IconHome>}}></Tabs.Screen>
         <Tabs.Screen name='Buscardor' options={{tabBarLabel:'Buscador',tabBarIcon:()=><IconSeach></IconSeach>}}></Tabs.Screen>
         <Tabs.Screen name='notificaciones' options={{tabBarLabel:"Notificaciones",tabBarIcon:()=><IconBell></IconBell>}}></Tabs.Screen>     
        <Tabs.Screen name='perfil' options={{tabBarLabel:"Perfil",tabBarIcon:()=><IconUser></IconUser>}}></Tabs.Screen>
                                            
        
    </Tabs>
  )
}
