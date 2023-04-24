import React, { useState, useEffect, useContext } from 'react'

const noAuthenticated = {
	authUser: null,
	isLoggedIn: false,
	isAdmin: false
}

const getAuthState = () => {
	const authInfo = localStorage.getItem("authInfo");
	return authInfo ? JSON.parse(authInfo) : noAuthenticated;
}

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = (props) => {
	const [authInfo, setAuthInfo] = useState(getAuthState)
	// this is user infos structure:
	// name: null,
	// surname: null,
	// date: null,
	// username: null,
	// email: null,
	// password: null,
	// admin = null
	// const [isLoggedIn, setIsLoggedIn] = useState(getAuthState("loggedIn"))
	// const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(getAuthState("loggedInAdmin"))

	useEffect(() => {
		localStorage.setItem("authInfo", JSON.stringify(authInfo))
	}, [authInfo])

	const logout = () => {
		console.warn("authInfo: ", authInfo)
		localStorage.setItem("authInfo", JSON.stringify(noAuthenticated))
		setAuthInfo(noAuthenticated)
	}

	const value = {
		authInfo,
		setAuthInfo,
		logout
	}


	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	)
}