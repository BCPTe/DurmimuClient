import React, { useState } from 'react'
import { Row, Form, Col, Button, FloatingLabel } from 'react-bootstrap'
import '../Profile.css'

const Register = () => {
	const [name, setName] = useState("")
	const [surname, setSurname] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleRegister = (e) => {
		e.preventDefault();
		let payload = JSON.stringify({
			name: name,
			surname: surname,
			username: username,
			password: password
		})
		console.log("submitted:", payload);
	}

	return (
		<Row className='profile-form-container'>
			<Col xs={8} md={6} lg={4}>
				<Form onSubmit={handleRegister} className="profile-form">
					<h4>Register</h4>
					<FloatingLabel className="name-group" controlId="floatingName" label="Name">
						<Form.Control type='text' placeholder="Name" onChange={(e) => setName(e.target.value)} required />
					</FloatingLabel>
					<FloatingLabel className="surname-group" controlId="floatingSurname" label="Surname">
						<Form.Control type='text' placeholder="Surname" onChange={(e) => setSurname(e.target.value)} required />
					</FloatingLabel>
					<FloatingLabel className="birthdate-group" controlId="floatingDate" label="Birthdate">
						<Form.Control type='date' placeholder="Birthdate" onChange={(e) => setSurname(e.target.value)} required />
					</FloatingLabel>
					<FloatingLabel className="username-group" controlId="floatingUsername" label="Username">
						<Form.Control type='text' placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
					</FloatingLabel>
					<FloatingLabel className="password-group" controlId="floatingPassword" label="Password">
						<Form.Control type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
					</FloatingLabel>
					<Button variant="secondary" type="submit">REGISTER</Button>
					<Form.Text>or <a href='/login'>login</a> if you already have an account</Form.Text>
				</Form>
			</Col>
		</Row>
	)
}

export default Register