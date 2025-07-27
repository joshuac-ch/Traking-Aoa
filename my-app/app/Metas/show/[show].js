import axios from 'axios'
import React, { useEffect, useState } from 'react'
import constatnes from "expo-constants"
import { useLocalSearchParams } from 'expo-router'
import PublicacionComponent from '../../../components/PublicacionComponent'
import ComponenteMetas from './ComponenteMetas'
export default function ShowMetasOther() {
  const host=constatnes.expoConfig.extra.host 
  const {show}=useLocalSearchParams()
  const [dataMetas, setdataMetas] = useState([])
  
  const [userCreator, setuserCreator] = useState("")
  const [dataCreator, setdataCreator] = useState([])

  const ShowMetas=async()=>{
    const {data}=await axios.get(`http://${host}:4000/metas/s/${show}`)
    setdataMetas(data)
    setuserCreator(data.usuario_id)
    
  }
  useEffect(()=>{
    ShowMetas()
  },[])
  
  const ShowUserMetas=async()=>{
    const {data}=await axios.get(`http://${host}:4000/usuarios/s/${userCreator}`)
    setdataCreator(data)
    
  }
  useEffect(()=>{
    if(userCreator){
      ShowUserMetas()
    }
  },[userCreator])
  return (
  <>
  <ComponenteMetas datasRutina={dataMetas} datosUser={dataCreator} ></ComponenteMetas>
   
  </>
  )
}

