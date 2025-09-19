import React from 'react'
import constantes from "expo-constants"
export default function getHost() {
    return(constantes?.expoConfig?.extra?.host|| "192.168.18.25")// fallback hardcodeado opcional
     
}
