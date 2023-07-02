import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Footer.scss";

const Footer = () => {
	return (
		<Row className="footer">
			<Col>
				<span>&copy; Durmimu Macares</span>
			</Col>
		</Row>
	);
};

export default Footer;
