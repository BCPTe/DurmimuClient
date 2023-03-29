import React, { useState } from 'react'
import { Row, Form, Col, Button, FloatingLabel } from 'react-bootstrap'
import './Login.css'

const Login = () => {
	/*STATES*/
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = (e) => {
		e.preventDefault();
		let payload = JSON.stringify({
			username: username,
			password: password
		})
		console.log("submitted:", payload);
	}

	return (
		<Row className='login-form-container'>
			<Col xs={8} md={6} lg={4}>
				<Form onSubmit={handleLogin} className="login-form">
					{/* <h4 className='text-center'>LOGIN</h4> */}
					<FloatingLabel className="username-group" controlId="floatingUsername" label="Username">
						<Form.Control type='username' placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
					</FloatingLabel>
					<FloatingLabel className="password-group" controlId="floatingPassword" label="Password">
						<Form.Control type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
					</FloatingLabel>
					<Button variant="secondary" type="submit">Login</Button>
				</Form>
			</Col>
		</Row>
	)
}

export default Login