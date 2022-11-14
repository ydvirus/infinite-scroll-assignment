import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'


export const RequireAuth = ({children}) => {
    const auth = useAuth()
    console.log("logined user =",auth.user)
    if(!auth.user){
        return <Navigate to="/" />
    }
  return children
}
