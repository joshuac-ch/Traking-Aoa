import axios from 'axios'
import React, { useState } from 'react'
import Constants from "expo-constants"
import { useUser } from '../components/UserContext';
import GetImage from '../utils/GetImage';
import getHost from './getHost';
export default function Habitos() {
  const host=getHost()
  const {user}=useUser()
  const [habitos, sethabitos] = useState([])
  const FecthHabitos=async()=>{
    try{
        const {data}=await axios.get(`http://${host}:4000/habitos/${user.id}`)
        const habitosURl=data.map((h)=>({
          ...h,
          imagen:GetImage(h.imagen)
        }))        
        sethabitos(habitosURl)
    }catch(err){
        alert("Hubo un error",err.message)
    }
  }   
    return {FecthHabitos,habitos}
}
