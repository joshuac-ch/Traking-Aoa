import { Tabs } from 'expo-router'
import React from 'react'
import { IconHome, IconSeach, IconUser } from '../../assets/Icons'

export default function _layout() {
  return (
    <Tabs>
        
        <Tabs.Screen name='Panel' options={{title:'Home',tabBarIcon:()=><IconHome></IconHome>
                                            ,headerShown:false}} ></Tabs.Screen>
        <Tabs.Screen name='perfil' options={{title:'Perfil',tabBarIcon:()=><IconUser></IconUser>}}></Tabs.Screen>
        <Tabs.Screen name='Buscardor' options={{title:'Buscador',tabBarIcon:()=><IconSeach></IconSeach>}}></Tabs.Screen>                                           
    </Tabs>
  )
}
