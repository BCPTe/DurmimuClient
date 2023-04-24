import React from 'react'
import '../../Contexts/AuthContext'
import { Row, Form, Col, Button, FloatingLabel } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'

const Profile = () => {
	const { authInfo } = useAuth()

	return (
		<Row className='profile-form-container'>
			<Col xs={10} md={6} lg={4}>
				<div className="profile-form">
					<h4>User Info</h4>
					<div className="name-surname-container">
						<FloatingLabel className="name-group" controlId="floatingName" label="Name">
							<Form.Control type='text' placeholder="Name" value={authInfo.authUser.name} required disabled/>
						</FloatingLabel>
						<FloatingLabel className="surname-group" controlId="floatingSurname" label="Surname">
							<Form.Control type='text' placeholder="Surname" value={authInfo.authUser.surname} required disabled/>
						</FloatingLabel>
					</div>
					<FloatingLabel className="birthdate-group" controlId="floatingDate" label="Birthdate">
						<Form.Control type='date' placeholder="Birthdate" value={authInfo.authUser.birthdate} required disabled/>
					</FloatingLabel>
					<FloatingLabel className="username-group" controlId="floatingUsername" label="Username">
						<Form.Control type='text' placeholder="Username" value={authInfo.authUser.username} required disabled/>
					</FloatingLabel>
					<FloatingLabel className="email-group" controlId="floatingEmail" label="Email">
						<Form.Control type='email' placeholder="Email" value={authInfo.authUser.email} required disabled/>
					</FloatingLabel>
				</div>
			</Col>
		</Row>
	)
}

export default Profile