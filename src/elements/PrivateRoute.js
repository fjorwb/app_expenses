import React from 'react'
import { useAuth } from '../context/AuthContext'
import {Navigate} from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user} = useAuth()

    if(user){
        return children
    } else {
        return <Navigate to='/signin'/>
    }
}

export default PrivateRoute;