import React, { createContext, useContext, useState } from 'react'
 const HistoriCreatecontext=createContext()
export default function HistorialProvider({children}) {
 
  const [historialC, sethistorialC] = useState([])
  const [seguidor, setseguidor] = useState(false)
  const [usuarioFollowID, setusuarioFollowID] = useState(0)
    return (
    <HistoriCreatecontext.Provider value={{historialC,sethistorialC,seguidor,setseguidor,
      usuarioFollowID,setusuarioFollowID
    }}>
        {children}
    </HistoriCreatecontext.Provider>
    )
}
export const useHistoryial=()=>useContext(HistoriCreatecontext) 
