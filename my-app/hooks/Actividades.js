import axios from 'axios'
import React, { useState } from 'react'

export default function Actividades() {
  const host='172.21.32.1'  
  const [actividades, setactividades] = useState([])
  const FetchActividades=async()=>{
    const {data}=await axios.get(`http://${host}:4000/actividades`)
    setactividades(data)
  }
    return {FetchActividades,actividades}
   
}
