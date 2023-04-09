import './App.css';
// import api from './API/axiosConfig';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react'
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Archive from './components/Archive/Archive';
import Profile from './components/Profile/Profile';
import Login from './components/Profile/Login/Login';
import Logout from './components/Profile/Login/Logout';
import Register from './components/Profile/Register/Register';
import { AuthProvider, useAuth } from './Contexts/AuthContext';

function App() {
	const {authUser, setAuthUser, isLoggedIn, setIsLoggedIn} = useAuth()
	return (
		<div className="App">
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route exact path='/' element={<Home />} />
						<Route path='/archive' element={<Archive />} />
						<Route path='/login' element={isLoggedIn ? <Navigate to='/' replace /> : <Login />} />
						<Route path='/logout' element={!isLoggedIn ? <Navigate to='/login' replace /> : <Logout />} />
						<Route path='/register' element={<Register />} />
						<Route path='/profile' element={!isLoggedIn ? <Navigate to='/' replace /> : <Profile />} />
					</Route>
				</Routes>
		</div>
	);
}

export default App;
