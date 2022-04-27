import { onAuthStateChanged } from 'firebase/auth'
import React, { useState, useContext, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig'
const AuthContext = React.createContext()

// hook to acces context
const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const cancelSubscription = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
        return cancelSubscription
    },[])

    return(
        <AuthContext.Provider value={{user:user}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext, useAuth}