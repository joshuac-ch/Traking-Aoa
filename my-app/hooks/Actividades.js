import axios from 'axios'
import React, { useState } from 'react'
import Constants from "expo-constants"
import { useUser } from '../components/UserContext'
import GetImage from '../utils/GetImage'
import getHost from './getHost'
export default function Actividades() {
  const {user}=useUser()
  const host=getHost()
  const [actividades, setactividades] = useState([])
  const FetchActividades=async()=>{
    const {data}=await axios.get(`http://${host}:4000/actividades/${user.id}`)
    const actiUrl=data.map((a)=>({
      ...a,
      imagen:GetImage(a.imagen)
    }))
    setactividades(actiUrl)
  }
    return {FetchActividades,actividades}
   
}
