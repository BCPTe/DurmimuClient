import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
	return (
		<Row className='footer'>
			<Col>
				<span>&copy; BCPTe</span>
			</Col>
		</Row>
	)
}

export default Footer