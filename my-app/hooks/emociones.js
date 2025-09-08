import axios from 'axios'
import React, { useState } from 'react'
import contantes from "expo-constants"
import getHost from './getHost'
export default function Funtemociones() {
  const [emocion, setemocion] = useState([])
  const host=getHost()
  const InsetEmocion=async()=>{
    await axios.post(`http://${host}:4000/emociones/i`,emocion)
     
  }
    return (
    {setemocion,InsetEmocion}
  )
}
