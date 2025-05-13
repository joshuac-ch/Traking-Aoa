import axios from 'axios'
import React, { useState } from 'react'

export default function usuarios() {
   const local='172.28.144.1'
   const [dataUser, setdataUser] = useState([])
   const FectUsuarios=async()=>{
    const {data}=await axios.get(`http://${local}:4000/usuarios`)
    setdataUser(data)
}
    return {
        FectUsuarios,dataUser
    }
}
