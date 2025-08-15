import axios from 'axios'
import React, { useState } from 'react'
import Constans from "expo-constants"
import { useUser } from '../components/UserContext'
import GetImage from '../utils/GetImage'
export default function Metas() {
  const [metas, setmetas] = useState([])
  const {user}=useUser()
  const host=Constans.expoConfig.extra.host
  const FectMetas=async()=>{
    const {data}=await axios.get(`http://${host}:4000/metas/${user.id}`)
    const metasUrl=data.map((m)=>({
      ...m,
      imagen:GetImage(m.imagen)
    }))
    setmetas(metasUrl)
  }  
  return {FectMetas,metas}
}
