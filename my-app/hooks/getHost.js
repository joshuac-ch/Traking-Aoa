import React from 'react'
import constantes from "expo-constants"
export default function getHost() {
    return(constantes.manifest2?.extra?.host|| constantes?.expoConfig?.extra?.host|| "52.23.170.150")// fallback hardcodeado opcional
     
}
