import React, { useEffect, useState } from "react";
import { Row, Col, Form, FloatingLabel, Button, Modal } from "react-bootstrap";
import "./NewMatchModal.scss";

const NewMatchModal = (props) => {
	const [when, setWhen] = useState(new Date());
	const [where, setWhere] = useState("");
	// for showing modal
	const [show, setShow] = useState(false)

	const handleSubmitNewMatch = () => {
		const whenInMs = when.getTime();
		const payload = JSON.stringify({
			when: whenInMs,
			where: where,
		});

		console.log(payload);
	};

	useEffect(() => {
		// open modal if "openModal" param in url is setted
		setShow(props.showModal)
	}, []);

	return (
		<Modal show={show} onHide={() => setShow(false)} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title className="fw-bold">Available matches</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				SUCATE TUTTI
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={() => setShow(false)}>Close</Button>
				<Button variant="success" onClick={() => handleSubmitNewMatch()}>Confirm</Button>
			</Modal.Footer>
		</Modal>
		// <Row className="newmatch-form-container">
		// 	<Col xs={10} md={6} lg={4}>
		// 		<Form onSubmit={handleSubmitNewMatch} className="newmatch-form">
		// 			<h4>New Match</h4>
		// 			<FloatingLabel
		// 				className="when-group"
		// 				controlId="when"
		// 				label="When is the match?"
		// 			>
		// 				<Form.Control
		// 					type="date"
		// 					placeholder="When is the match?"
		// 					onChange={(e) => setWhen(e.target.value)}
		// 					required
		// 				/>
		// 			</FloatingLabel>
		// 			<FloatingLabel
		// 				className="where-group"
		// 				controlId="where"
		// 				label="Where is the match?"
		// 			>
		// 				<Form.Control
		// 					type="text"
		// 					placeholder="Where is the match?"
		// 					onChange={(e) => setWhere(e.target.value)}
		// 					required
		// 				/>
		// 			</FloatingLabel>
		// 			<Button variant="secondary" type="submit">
		// 				ADD
		// 			</Button>
		// 		</Form>
		// 	</Col>
		// </Row>
	);
};

export default NewMatchModal;
