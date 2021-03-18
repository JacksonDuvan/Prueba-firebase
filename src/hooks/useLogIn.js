import { useState, useEffect } from 'react'
import { auth } from '../firebaseconfig'


export const useLogIn = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                setUser(user.uid)
            }
        })
    },[])

    return { user }
}