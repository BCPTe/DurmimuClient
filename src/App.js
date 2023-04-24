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
import NewMatch from './components/NewMatch/NewMatch';
import { useAuth } from './Contexts/AuthContext';

function App() {
	// debugger
	//FIX: verificare perché fa un autologout ogni volta che viene cliccata una nuova page sull'header
	// const { authInfo } = useAuth()
	const { authInfo } = useAuth()
	return (
		<div className="App">
			<Routes>
				<Route exact path='/' element={<Layout />}>
					<Route exact path='/' element={<Home />} />
					<Route path='/archive' element={<Archive />} />
					<Route path='/login' element={authInfo.isLoggedIn ? <Navigate to='/' replace /> : <Login />} />
					<Route path='/logout' element={!authInfo.isLoggedIn ? <Navigate to='/login' replace /> : <Logout />} />
					<Route path='/register' element={authInfo.isLoggedIn ? <Navigate to='/login' replace /> : <Register />} />
					<Route path='/profile' element={!authInfo.isLoggedIn ? <Navigate to='/login' replace /> : <Profile />} />
					<Route path='/newmatch' element={!authInfo.isLoggedIn || !authInfo.isAdmin ? <Navigate to='/' replace /> : <NewMatch />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
