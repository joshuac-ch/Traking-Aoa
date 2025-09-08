import axios from 'axios'
import React, { useState } from 'react'
import Constants from 'expo-constants'
import getHost from './getHost'
export default function usuarios() {
   const local=getHost()
   
   const [dataUser, setdataUser] = useState([])
   const FectUsuarios=async()=>{
    const {data}=await axios.get(`http://${local}:4000/usuarios`)
    setdataUser(data)
}
    return {
        FectUsuarios,dataUser
    }
}
