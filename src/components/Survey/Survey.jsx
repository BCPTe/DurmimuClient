import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, OverlayTrigger, Popover } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../../API/axiosConfig";
import { useAuth } from "../../Contexts/AuthContext";
import "./Survey.scss";
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import ReactCardFlip from "react-card-flip";
import { useParams, useSearchParams } from "react-router-dom";
import NewMatchModal from "../Match/NewMatchModal/NewMatchModal";

const Survey = () => {
	const { authStatus } = useAuth();
	const auth = authStatus();

	// debugger
	const [date, setDate] = useState(new Date());
	const [min] = useState(new Date()); // that's the current day
	const [max] = useState(new Date()); // that's +2 months from current day
	const [userDates, setUserDates] = useState([]);
	// for flipcard
	const [flip, setFlip] = useState(false);
	//
	const [playersInDay, setPlayersInDay] = useState([]);
	const [surveyUsed, setSurveyUsed] = useState([]); // >0 players
	const [surveyFull, setSurveyFull] = useState([]); // >=12 players
	// for modal
	const [params, setParams] = useSearchParams()
	const [showModal, setShowModal] = useState(params.has('openModal'))
	// console.log(showModal);

	const printDate = (dateToPrint) => {
		const temp = new Date(dateToPrint);
		return temp.toLocaleDateString();
	};

	const getPlayersInDay = () => {
		const dateInMillisecond = date.getTime();
		api.get("/api/v1/surveys", {
			params: {
				date: dateInMillisecond,
			},
		}).then((response) => {
			setPlayersInDay(response.data.players);
		});
	};

	const getUserDates = () => {
		api.get("/api/v1/surveys", {
			params: { user: auth.authUser.username },
		}).then((response) => {
			setUserDates(response.data);
		});
	};

	const handleAddDate = () => {
		const payload = {
			operation: "add",
			username: auth.authUser.username,
			date: date.getTime(),
		};

		// DONE: IMPLEMENT IN BACKEND
		api.post("/api/v1/surveys", payload)
			.then((response) => {
				getUserDates();
				getPlayersInDay();
				getUsedSurveys();
			})
			.catch((err) => {
				console.warn(err);
			});
	};

	const handleRemoveDate = (e) => {
		const date = e.target.getAttribute("date-id");
		const payload = {
			operation: "del",
			username: auth.authUser.username,
			date: date,
		};

		// DONE: IMPLEMENT IN BACKEND
		api.post("/api/v1/surveys", payload)
			.then((response) => {
				getUserDates();
				getPlayersInDay();
				getUsedSurveys();
			})
			.catch((err) => {
				console.warn(err);
			});
	};

	const getUsedSurveys = () => {
		api.get("/api/v1/surveys").then((response) => {
			var usedDates = response.data.filter((s) => s.players.length > 0 && s.players.length < 12);
			var fullDates = response.data.filter((s) => s.players.length >= 12);
			setSurveyUsed(usedDates.map((d) => d.date));
			setSurveyFull(fullDates.map(d => d.date));
			console.log(surveyFull);
		});
	};

	// get all players in the selected day
	useEffect(() => {
		getPlayersInDay();
	}, [date]);

	// INITIALIZATION PARAMS
	useEffect(() => {
		// get all players for day selected on load
		getPlayersInDay();
		// get all dates selected by current user (authenticated user)
		getUserDates();
		// get all surveys with at least one player
		getUsedSurveys();
		// declaring&setting max date available for survey (2 months from now)
		const today = new Date(new Date().getTime());
		min.setHours(0, 0, 0, 0);
		max.setMonth(today.getMonth() + 2);
	}, []);

	return (
		<div className="survey-container">
			<Col xs={10} md={5} lg={4} className="h-75">
				<ReactCardFlip isFlipped={flip}>
					<div className="survey-form">
						{userDates?.length < 2 && (
							<>
								{/* create calendar with minDate today and maxDate 2 month from today */}
								<Calendar
									minDate={min}
									maxDate={max}
									className="custom-calendar"
									onChange={setDate}
									value={date}
									tileClassName={({ date, view }) => {
										if (surveyFull.includes(date.getTime()))
											return "full-dates";
										else if (surveyUsed.includes(date.getTime()))
											return "used-dates";
									}}
								/>
								<div className="calendar-btns">
									<Button
										variant="secondary"
										onClick={handleAddDate}
									>
										Add
									</Button>
									<Button
										variant="outline-primary"
										onClick={() => setFlip(!flip)}
										disabled={
											!playersInDay ||
											typeof playersInDay ===
												"undefined" ||
											playersInDay.length <= 0
										}
									>
										{playersInDay &&
											playersInDay.length > 0 &&
											"View"}{" "}
										{playersInDay ? playersInDay.length : 0}{" "}
										{playersInDay !== 1
											? "players"
											: "player"}
									</Button>
								</div>
							</>
						)}
						{userDates?.length > 0 && (
							<div className="d-flex w-100 flex-column">
								<div className="fw-bold text-center mt-1 mb-1">
									Date che hai selezionato:
								</div>
								<div className="dates-in-db">
									{userDates?.map((item, index) => (
										<div className="date" key={index}>
											<div>{printDate(item.date)}</div>
											<OverlayTrigger
												rootClose
												trigger="click"
												placement="right"
												overlay={
													// TODO: at this moment it shows all popovers also on a single click. Needs to declare it separately.
													// Find a way to manage this problem.
													<Popover className="popover_del_component">
														<Popover.Body>
															<div className="text-center">
																Do you really
																want to remove
																your
																availability for{" "}
																{printDate(
																	item.date
																)}
																?
															</div>
															<div className="d-flex justify-content-around mt-3">
																<Button
																	variant="danger"
																	onClick={(
																		e
																	) =>
																		handleRemoveDate(
																			e
																		)
																	}
																	date-id={
																		item.date
																	}
																>
																	Yes
																</Button>
																<Button
																	variant="secondary"
																	onClick={() =>
																		document.body.click()
																	}
																>
																	No
																</Button>
															</div>
														</Popover.Body>
													</Popover>
												}
											>
												<Button variant="danger">
													<FontAwesomeIcon
														icon={faTimes}
														date-id={item.date}
													/>
												</Button>
											</OverlayTrigger>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
					<div className="survey-form">
						<div className="players-in-day">
							{playersInDay?.map((player, index) => (
								<Row className="player" key={index}>
									<Col
										xs={7}
										className="name-surname-container"
									>
										<FontAwesomeIcon icon={faUser} />
										<span className="name-surname">
											{player.name} {player.surname}
										</span>
									</Col>
									<Col
										xs={4}
										className="username-container text-end"
									>
										<span className="username fw-bold">
											{player.username}
										</span>
									</Col>
								</Row>
							))}
						</div>
						<div className="down-btns">
							<Button
								variant="outline-primary"
								onClick={() => setFlip(!flip)}
							>
								Return to calendar
							</Button>
						</div>
					</div>
				</ReactCardFlip>
			</Col>
			<NewMatchModal showModal={showModal} />
		</div>
	);
};

export default Survey;
