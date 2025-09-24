import React from 'react'
import constantes from "expo-constants"
export default function getHost() {
    return(constantes?.expoConfig?.extra?.host|| "3.87.87.124")// fallback hardcodeado opcional
     
}
