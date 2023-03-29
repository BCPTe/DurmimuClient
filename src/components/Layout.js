import './Layout.css'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Container } from 'react-bootstrap'


const Layout = () => {
	return (
		<>
			<Header />
			<div className='body'>
				<Outlet />
			</div>
			<Footer />
		</>
	)
}

export default Layout