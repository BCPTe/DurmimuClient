import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Match.css'

const NextMatch = () => {
	return (
		<Container fluid className='h-100'>
			<Row className='match-container'>
				<Col xs={8} md={6} lg={4} className='match p-0'>
					<Col xs={12} sm={12} md={4} className='info p-1'>
						<div className='hour text-center'>19:00</div>
						<div className='location text-center'>LOCATION PLACEHOLDER</div>
					</Col>
					<Col xs={12} md={8} className="motivational p-1">
						<div className='cit text-center'>
							<i>Sbagli il 100% dei colpi che non spari.</i>
						</div>
					</Col>
				</Col>
			</Row>
		</Container>
	)
}

export default NextMatch