import React from 'react'
import { useAuth } from '../../../Contexts/AuthContext'

const Logout = () => {
	const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
	
	setAuthUser(null)
	setIsLoggedIn(false)
}

export default Logout