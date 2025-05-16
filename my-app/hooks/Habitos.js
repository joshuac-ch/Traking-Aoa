import axios from 'axios'
import React, { useState } from 'react'
import Constants from "expo-constants"
export default function Habitos() {
  const host=Constants.expoConfig.extra.host;
  const [habitos, sethabitos] = useState([])
  const FecthHabitos=async()=>{
    try{
        const {data}=await axios.get(`http://${host}:4000/habitos`)
        sethabitos(data)
    }catch(err){
        alert("Hubo un error",err.message)
    }
  }   
    return {FecthHabitos,habitos}
}
