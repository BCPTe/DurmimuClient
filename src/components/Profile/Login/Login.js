import React, { useState } from 'react'
import { Row, Form, Col, Button, FloatingLabel } from 'react-bootstrap'
import '../Profile.css'
import api from '../../../API/axiosConfig'
import { useOutletContext } from 'react-router-dom'
import bcrypt from 'bcryptjs'
import { useAuth } from '../../../Contexts/AuthContext'

const Login = () => {
	/*STATES*/
	const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

	const [usernameOrEmail, setUsernameOrEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = (e) => {
		e.preventDefault();

		const payload = JSON.stringify({
			usernameOrEmail: usernameOrEmail,
			password: bcrypt.hash(password)
		})

		api.post("/api/v1/users/login", payload)
			.then(response => {
				console.log("response: ", response)
				if (response.status === 200) setAuthUser({
					name: response.data.name,
					surname: response.data.surname,
					username: response.data.username,
					email: response.data.email,
					birthdate: response.data.birthdate,
				})
			})
	}

	return (
		<Row className='profile-form-container'>
			<Col xs={8} md={6} lg={4}>
				<Form onSubmit={handleLogin} className="profile-form">
					<h4>Login</h4>
					<FloatingLabel className="usernameoremail-group" controlId="floatingUsernameOrMail" label="Username or Email">
						<Form.Control type='text' placeholder="Username or Email" onChange={(e) => setUsernameOrEmail(e.target.value)} required />
					</FloatingLabel>
					<FloatingLabel className="password-group" controlId="floatingPassword" label="Password">
						<Form.Control type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
					</FloatingLabel>
					<Button variant="secondary" type="submit">LOGIN</Button>
					<Form.Text>or <a href='/register'>register</a> if you don't have an account yet</Form.Text>
				</Form>
			</Col>
		</Row>
	)
}

export default Login