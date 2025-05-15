import axios from 'axios'
import React, { useState } from 'react'
export default function Habitos() {
  const host='172.19.96.1'
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
