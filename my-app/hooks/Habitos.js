import axios from 'axios'
import React, { useState } from 'react'
import Constants from "expo-constants"
import { useUser } from '../components/UserContext';
export default function Habitos() {
  const host=Constants.expoConfig.extra.host;
  const {user}=useUser()
  const [habitos, sethabitos] = useState([])
  const FecthHabitos=async()=>{
    try{
        const {data}=await axios.get(`http://${host}:4000/habitos/${user.id}`)
        sethabitos(data)
    }catch(err){
        alert("Hubo un error",err.message)
    }
  }   
    return {FecthHabitos,habitos}
}
