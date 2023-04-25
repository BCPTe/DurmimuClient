import './App.css';
// import api from './API/axiosConfig';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Survey from './components/Survey/Survey';
import Archive from './components/Archive/Archive';
import Profile from './components/Profile/Profile';
import Login from './components/Profile/Login/Login';
import Logout from './components/Profile/Login/Logout';
import Register from './components/Profile/Register/Register';
import NewMatch from './components/NewMatch/NewMatch';
import { useAuth } from './Contexts/AuthContext';
import { useCookies } from 'react-cookie';

function App() {
	const { authStatus } = useAuth()
	const auth = authStatus()

	return (
		<div className="App">
			<Routes>
				<Route exact path='/' element={<Layout />}>
					<Route exact path='/' element={<Home />} />
					<Route path='/survey' element={!auth?.isLoggedIn ? <Navigate to='/' replace /> : <Survey />} />
					<Route path='/archive' element={<Archive />} />
					<Route path='/login' element={auth?.isLoggedIn ? <Navigate to='/' replace /> : <Login />} />
					<Route path='/logout' element={!auth?.isLoggedIn ? <Navigate to='/login' replace /> : <Logout />} />
					<Route path='/register' element={auth?.isLoggedIn ? <Navigate to='/login' replace /> : <Register />} />
					<Route path='/profile' element={!auth?.isLoggedIn ? <Navigate to='/login' replace /> : <Profile />} />
					<Route path='/newmatch' element={!auth?.isLoggedIn || !auth?.isAdmin ? <Navigate to='/' replace /> : <NewMatch />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
