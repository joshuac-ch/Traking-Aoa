import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({id:3})//Esto es solo prueba para que se inicialice
  //const [user, setUser] = useState({id:2})//Esto es solo prueba para que se inicialice

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
