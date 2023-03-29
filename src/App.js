import './App.css';
import api from './API/axiosConfig';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Archive from './components/Archive/Archive';

function App() {

	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/archive' element={<Archive />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
