import React, { useState, useEffect, useContext } from 'react'
import api from '../API/axiosConfig'
import { useCookies } from 'react-cookie';

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = (props) => {
	const [cookies, setCookie, removeCookie] = useCookies(['auth'])
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

	// useEffect(() => {
	// 	setCookie("auth", JSON.stringify(cookies['auth']))
	// }, [])

	const authStatus = () => {
		return cookies['auth']
	}

	const login = (payload) => {
		api.post("/api/v1/users/login", payload)
			.then(response => {
				console.log("response: ", response)
				if (response.status === 200) {
					const authObj = {
						authUser: {
							name: response.data.name,
							surname: response.data.surname,
							username: response.data.username,
							email: response.data.email,
							birthdate: response.data.birthdate,
							admin: response.data.admin
						},
						isLoggedIn: true,
						isAdmin: response.data.admin ? true : false
					}
					setCookie("auth", authObj)
					console.log(cookies['auth'])
				}
			})
	}

	const logout = () => {
		console.warn("auth: ", cookies['auth'])
		// localStorage.setItem("authInfo", JSON.stringify(noAuthenticated))
		removeCookie("auth")
	}

	const value = {
		login,
		logout,
		authStatus
	}


	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	)
}