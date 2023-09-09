import React, { useEffect, useState } from "react";
import api from "../../../API/axiosConfig";
import { Row, Col, Form, FloatingLabel, Button, Modal } from "react-bootstrap";
import "./NewMatchModal.scss";

const NewMatchModal = (props) => {
	const [when, setWhen] = useState(new Date());
	const [where, setWhere] = useState("");
	// for showing modal
	const [show, setShow] = useState(false);
	const [showPlayersModal, setShowPlayersModal] = useState(false);
	// modal content (survey used or full)
	const [surveyUsed, setSurveyUsed] = useState([]);
	const [surveyFull, setSurveyFull] = useState([]);
	const [playersList, setPlayersList] = useState([]);
	// checkbox management
	const [selectedCheck, setSelectedCheck] = useState([]);

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

	const handleChangeCheck = (e) => {
		console.log(e.target.value);
		if (e.target.checked) {
			setSelectedCheck([...selectedCheck, e.target.value]);
		} else {
			setSelectedCheck(selectedCheck.filter((c) => c !== e.target.value));
		}
	};

	useEffect(() => {
		console.log(playersList);
		console.log(showPlayersModal);
	}, [playersList]);

	const handleSubmitNewMatch = (s) => {
		var surveyDate = s.date
		var surveyActive = !s.active

		const payload = {
			operation: "set-active",
			date: surveyDate,
			active: surveyActive
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
						surveyUsed.map((s) => (
							<div className="match-row" key={s.date}>
								<div className="match-date">{printDate(s.date)}</div>
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
									{s.active ? (
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
									onClick={() => handleSubmitNewMatch(s)}
									>
										Activate
									</Button>
									)}
								</div>
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
