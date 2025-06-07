import axios from 'axios'
import React, { useState } from 'react'
import contantes from "expo-constants"
export default function Funtemociones() {
  const [emocion, setemocion] = useState([])
  const host=contantes.expoConfig.extra.host
  const InsetEmocion=async()=>{
    await axios.post(`http://${host}:4000/emociones/i`,emocion)
     
  }
    return (
    {setemocion,InsetEmocion}
  )
}
