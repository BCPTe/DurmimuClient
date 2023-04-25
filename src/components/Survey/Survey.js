import React, { useState } from 'react'
import { Row, Form, Col, Button, FloatingLabel } from 'react-bootstrap'
import './Survey.css'


const Survey = () => {
	const [date, setDate] = useState("")

	const getTodaysDate = () => {
		const date = new Date()
		// using of slice is due to getMonth and getDate return numbers without eventual leading 0
		const today = date.getFullYear() + "-" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('0' + (date.getDate())).slice(-2)

		return today
	}
	
	const handleSubmitDate = () => {
		console.log(date)
	}
	
	return (
		<Row className='survey-form-container'>
			<Col xs={10} md={6} lg={4}>
				<Form onSubmit={handleSubmitDate} className="survey-form">
					<h4>Select availability</h4>
					<FloatingLabel className="date-group" controlId="floatingDate" label="Date">
						<Form.Control type='date' min={getTodaysDate()} placeholder="Date" onChange={(e) => setDate(e.target.value)} required />
					</FloatingLabel>
					<Button variant="secondary" type="submit">CONFIRM</Button>
				</Form>
			</Col>
		</Row>
	)
}

export default Survey
