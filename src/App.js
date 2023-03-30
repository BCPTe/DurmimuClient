import './App.css';
// import api from './API/axiosConfig';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Archive from './components/Archive/Archive';
import Profile from './components/Profile/Profile';
import Login from './components/Profile/Login/Login';
import Register from './components/Profile/Register/Register';

function App() {

	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/archive' element={<Archive />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile' element={<Profile />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
