import React, { createContext, useContext, useState } from 'react'
 const HistoriCreatecontext=createContext()
export default function HistorialProvider({children}) {
 
  const [historialC, sethistorialC] = useState([])
  
    return (
    <HistoriCreatecontext.Provider value={{historialC,sethistorialC}}>
        {children}
    </HistoriCreatecontext.Provider>
    )
}
export const useHistoryial=()=>useContext(HistoriCreatecontext) 
