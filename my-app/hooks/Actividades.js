import axios from 'axios'
import React, { useState } from 'react'
import Constants from "expo-constants"
import { useUser } from '../components/UserContext'
export default function Actividades() {
  const {user}=useUser()
  const host=Constants.expoConfig.extra.host
  const [actividades, setactividades] = useState([])
  const FetchActividades=async()=>{
    const {data}=await axios.get(`http://${host}:4000/actividades/${user.id}`)
    setactividades(data)
  }
    return {FetchActividades,actividades}
   
}
