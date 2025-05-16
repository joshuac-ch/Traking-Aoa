import axios from 'axios'
import React, { useState } from 'react'
import Constans from "expo-constants"
export default function Metas() {
  const [metas, setmetas] = useState([])
  const host=Constans.expoConfig.extra.host
  const FectMetas=async()=>{
    const {data}=await axios.get(`http://${host}:4000/metas`)
    setmetas(data)
  }
  return {FectMetas,metas}
}
