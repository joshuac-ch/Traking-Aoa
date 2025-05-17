import axios from 'axios'
import React, { useState } from 'react'
import Constants from "expo-constants"
export default function Actividades() {
  const host=Constants.expoConfig.extra.host
  const [actividades, setactividades] = useState([])
  const FetchActividades=async()=>{
    const {data}=await axios.get(`http://${host}:4000/actividades`)
    setactividades(data)
  }
    return {FetchActividades,actividades}
   
}
