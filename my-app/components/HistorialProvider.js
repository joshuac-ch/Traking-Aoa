import React, { createContext, useContext, useState } from 'react'
 const HistoriCreatecontext=createContext()
export default function HistorialProvider({children}) {
 
  const [historialC, sethistorialC] = useState([])
  const [seguidor, setseguidor] = useState(false)

    return (
    <HistoriCreatecontext.Provider value={{historialC,sethistorialC,seguidor,setseguidor}}>
        {children}
    </HistoriCreatecontext.Provider>
    )
}
export const useHistoryial=()=>useContext(HistoriCreatecontext) 
