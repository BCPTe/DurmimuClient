import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Match.scss";

const Match = () => {
	return (
		<Row className="match-container">
			<Col xs={8} md={6} lg={4} className="match p-0">
				<Col xs={12} sm={12} md={4} className="info p-1">
					<div className="title text-center text-muted">
						NEXT MATCH
					</div>
					<div className="when-info text-center">
						<div className="day">6 Aprile</div>
						<div className="hour">22:00</div>
					</div>
					<div className="location text-center">LINDA'S HOUSE</div>
				</Col>
				<Col xs={12} md={8} className="motivational p-1">
					<div className="cit text-center">
						<i>Sbagli il 100% dei colpi che non spari.</i>
					</div>
				</Col>
			</Col>
		</Row>
	);
};

export default Match;
