import React, { useEffect, useState, useRef } from "react";
import api from "../../../API/axiosConfig";
import { Row, Col, Form, FloatingLabel, Button, Modal } from "react-bootstrap";
import "./NewMatchModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const NewMatchModal = (props) => {
	const [hour, setHour] = useState("")
	const [location, setLocation] = useState("")
	const [finalHour, setFinalHour] = useState(undefined)
	// for showing modal
	const [show, setShow] = useState(false);
	const [showPlayersModal, setShowPlayersModal] = useState(false);
	// modal content (survey used or full)
	const [surveyUsed, setSurveyUsed] = useState([]);
	const [surveyFull, setSurveyFull] = useState([]);
	const [playersList, setPlayersList] = useState([]);
	// activating management
	const [activating, setActivating] = useState(false)
	const [insertingHour, setInsertingHour] = useState(false)
	const [activationState, setActivationState] = useState([]);

	const PlayersModal = () => {
		return (
			<Modal
				show={showPlayersModal}
				onHide={() => setShowPlayersModal(false)}
				size="md"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Players</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{playersList.map((p) => (
						<div className="player" key={p.username}>
							{p.username}
						</div>
					))}
				</Modal.Body>
			</Modal>
		);
	};

	const printDate = (dateToPrint) => {
		const temp = new Date(dateToPrint);
		// this way it prints a "0" if the month is between 1 and 9 (to always have a 2-digit notation)
		return `${temp.getDate()}/${temp.getMonth()+1 < 10 ? `0${temp.getMonth()+1}` : temp.getMonth()+1}`;
	};

	useEffect(() => {
		console.log(playersList);
		console.log(showPlayersModal);
	}, [playersList]);

	const convertStringToHour = (e, s) => {
		// debugger
		const hour_inserted = e.target.value;
		setHour(hour_inserted)
		
		var temp = new Date(s.date)
		var [h,m] = hour_inserted.split(":")
		if (!h || !m) {
			setFinalHour(undefined)
			return
		}
		setFinalHour(new Date(temp.setHours(h,m)).getTime())
	}

	const handleSubmitNewMatch = (s) => {
		var surveyDate = s.date
		var surveyActive = !s.active

		const payload = {
			operation: "set-active",
			date: surveyDate,
			finalDate: finalHour,
			active: surveyActive,
			location: location
		}

		api.post("/api/v1/surveys", payload)
			.then((response) => {
				getUsedSurveys();
			})
			.catch((err) => {
				console.warn(err);
			});

		console.log(payload);
	};

	const getUsedSurveys = () => {
		api.get("/api/v1/surveys").then((response) => {
			var usedDates = response.data.filter(
				(s) => s.players.length > 0 && s.players.length < 12
			);
			var fullDates = response.data.filter((s) => s.players.length >= 12);
			setSurveyUsed(usedDates);
			setSurveyFull(fullDates);
		});
	};

	useEffect(() => {
		// open modal if "openModal" param in url is setted
		setShow(props.showModal);
		// get all used an full surveys
		getUsedSurveys();
	}, []);


	// TODO: RETHINK THE ACTIVATIONSTATE METHOD
	useEffect(() => {
		// Initialize popover visibility array
		const initialState = surveyUsed.map(s => s.active)
		console.log(initialState)
		setActivationState(initialState)
	}, [surveyUsed]);

	
	return (
		<>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				size="md"
				centered
				className="modal-newmatch"
			>
				<Modal.Header closeButton>
					<Modal.Title className="fw-bold">
						Available matches
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="matches">
					{surveyUsed.length > 0 &&
						surveyUsed.map((s, index) => (
							<div className="match-row" key={s.date}>
								<div className="match-date">{printDate(s.date)}</div>
								{!activationState[index] &&
									<div className="match-manage-btns">
										<Button
										variant="secondary"
										onClick={() => {
											setPlayersList(s.players);
											setShowPlayersModal(true);
										}}
										>
											View {s.players.length} {s.players > 1 ? "players" : "player"}
										</Button>
										{activationState[index] ? (
											/* set survey active = false */
											<Button
											variant="danger"
											onClick={() => handleSubmitNewMatch(s)}
											>
											Deactivate
											</Button>
											) : (
												/* set survey active = true */
												<Button
												variant="success"
												onClick={() => {
													setActivationState((prevActivation) => {
														const newActivation = [...prevActivation];
														newActivation[index] = !newActivation[index];
														return newActivation;
													})
												}}
												>
											Activate
										</Button>
										)}
									</div>
								}
								{activationState[index] &&
									<div className="match-manage-btns">
										{!insertingHour ? (
											<>
												<Form.Control placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)}/>
												{location == "" ? (
													<Button variant="danger" className="confirm-btn" onClick={
														() => setActivationState((prevActivation) => {
														const newActivation = [...prevActivation];
														newActivation[index] = !newActivation[index];
														return newActivation;
													})}>
														<FontAwesomeIcon icon={faTimes} />
													</Button>
												) : (
													<Button variant="success" className="confirm-btn" onClick={() => setInsertingHour(true)}>
														<FontAwesomeIcon icon={faArrowRight} />
													</Button>
												)}
											</>
										) : (
											<>
												<Form.Control placeholder="Enter hour" value={hour} onChange={(e) => convertStringToHour(e, s)}/>
												{hour == "" ? (
													<Button variant="danger" className="confirm-btn" onClick={() => setInsertingHour(false)}>
														<FontAwesomeIcon icon={faArrowLeft} />
													</Button>
												) : (
													<Button variant="success" className="confirm-btn" onClick={() => handleSubmitNewMatch(s)}>
														<FontAwesomeIcon icon={faCheck} />
													</Button>
												)}
											</>
										)}
									</div>
								}
							</div>
						))}
					{surveyUsed.length == 0 && 
						<div>No matches available!</div>
					}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={() => setShow(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<PlayersModal></PlayersModal>
		</>
	);
};

export default NewMatchModal;
