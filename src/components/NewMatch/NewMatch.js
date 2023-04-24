import React, { useState } from 'react'
import { Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'
import './NewMatch.css'


const NewMatch = () => {
	const [when, setWhen] = useState("")
	const [where, setWhere] = useState("")

	const handleSubmitNewMatch = () => {
		const payload = JSON.stringify({
			when: when,
			where: where
		})

		console.log(payload)
	}

	return (
		<Row className='newmatch-form-container'>
			<Col xs={10} md={6} lg={4}>
				<Form onSubmit={handleSubmitNewMatch} className="newmatch-form">
					<h4>New Match</h4>
					<FloatingLabel className="when-group" controlId="when" label="When is the match?">
						<Form.Control type='text' placeholder="When is the match?" onChange={(e) => setWhen(e.target.value)} required />
					</FloatingLabel>
					<FloatingLabel className="where-group" controlId="where" label="Where is the match?">
						<Form.Control type='text' placeholder="Where is the match?" onChange={(e) => setWhere(e.target.value)} required />
					</FloatingLabel>
					<Button variant="secondary" type="submit">ADD</Button>
				</Form>
			</Col>
		</Row>
	)
}

export default NewMatch