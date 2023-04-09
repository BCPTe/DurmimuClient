import React, { useState, useEffect, useContext } from 'react'

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = (props) => {
	const [authUser, setAuthUser] = useState(null)
	// this is user infos structure:
	// name: null,
	// surname: null,
	// date: null,
	// username: null,
	// email: null,
	// password: null
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const value = {
		authUser,
		setAuthUser,
		isLoggedIn,
		setIsLoggedIn
	}

	return(
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	)
}