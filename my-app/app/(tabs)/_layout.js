import { Tabs } from 'expo-router'
import React from 'react'
import { IconBell, IconHome, IconSeach, IconUser } from '../../assets/Icons'

export default function _layout() {
  return (
    <Tabs screenOptions={{
       tabBarActiveTintColor: 'white',
       tabBarInactiveTintColor:"gray",
       tabBarLabelStyle: { fontSize: 12 },
       tabBarStyle:{backgroundColor:"#131313"},
       sceneContainerStyle:{backgroundColor:"#131313"}}}>
        
        <Tabs.Screen name='Panel' options={{tabBarLabel:'',tabBarIcon:({color})=><IconHome color={color}></IconHome>}}></Tabs.Screen>
         <Tabs.Screen name='Buscardor' options={{tabBarLabel:'',tabBarIcon:({color})=><IconSeach color={color}></IconSeach>}}></Tabs.Screen>
         <Tabs.Screen name='notificaciones' options={{tabBarLabel:"",tabBarIcon:({color})=><IconBell color={color}></IconBell>}}></Tabs.Screen>     
        <Tabs.Screen name='perfil' options={{tabBarLabel:"",tabBarIcon:({color})=><IconUser color={color}></IconUser>}}></Tabs.Screen>
                                            
        
    </Tabs>
  )
}
