import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, OverlayTrigger, Popover } from 'react-bootstrap'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import api from '../../API/axiosConfig'
import { useAuth } from '../../Contexts/AuthContext'
import './Survey.css'
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import ReactCardFlip from "react-card-flip"


const Survey = () => {
	const { authStatus } = useAuth()
	const auth = authStatus()

	// debugger
	const [date, setDate] = useState(new Date())
	const [min, setMin] = useState(new Date())
	const [max, setMax] = useState(new Date())
	const [datesInDb, setDatesInDb] = useState([])
	// for flipcard
	const [flip, setFlip] = useState(false)
	//
	const [playersInDay, setPlayersInDay] = useState([])

	const printDate = (dateToPrint) => {
		const temp = new Date(dateToPrint)
		return temp.toLocaleDateString()
	}

	// const classForPresentPlayers = ({ date, view }) => {
	// 	// get all dates with users present
	// 	if (presentDates.find(lDate => printDate(lDate) === date)) {
	// 		return "class-for-present-date"
	// 	}
	// }

	// FIXME: backend needs long and not string (adapt frontend to send long)
	const getPlayersInDay = () => {
		const dateInMillisecond = date.getTime()
		api.get("/api/v1/surveys", {
			params: {
				date: dateInMillisecond
			}
		})
			.then(response => {
				setPlayersInDay(response.data.players)
			})
	}
	// useEffect(() => {
	// 	console.log(playersInDay)
	// }, [playersInDay])


	const getUserDates = () => {
		api.get("/api/v1/surveys", {
			params: { user: auth.authUser.username }
		})
			.then(response => {
				setDatesInDb(response.data)
			})
	}

	const handleAddDate = () => {
		const payload = {
			operation: "add",
			username: auth.authUser.username,
			date: date.getTime()
		}

		// DONE: IMPLEMENT IN BACKEND
		api.post("/api/v1/surveys", payload)
			.then(response => {
				getUserDates()
			})
			.catch(err => {
				console.warn(err)
			})
	}

	// get all players in the selected day
	useEffect(() => {
		getPlayersInDay()
	}, [date])


	// INITIALIZATION PARAMS
	useEffect(() => {
		// get all players for day selected on load
		getPlayersInDay()
		// get all dates selected by current user (authenticated user)
		getUserDates()
		// declaring&setting max date available for survey (2 months from now)
		const today = new Date(new Date().getTime())
		min.setHours(0, 0, 0, 0)
		max.setMonth(today.getMonth() + 2)
	}, [])


	const handleRemoveAvailability = () => {
		// TODO: IMPLEMENT IN BACKEND
	}
	//




	return (
		<div className='survey-container'>
			<Col xs={10} md={5} lg={4} className='h-75'>
				<ReactCardFlip isFlipped={flip}>
					<div className='survey-form'>
						{datesInDb?.length < 2 &&
							<>
								{/* create calendar with minDate today and maxDate 2 month from today */}
								<Calendar minDate={min}
									maxDate={max}
									className="custom-calendar" onChange={setDate} value={date}
								// tileClassName={classForPresentPlayers}
								/>
								<div className='calendar-btns'>
									<Button variant='secondary' onClick={handleAddDate}>Add</Button>
									{playersInDay &&
										<Button variant='outline-primary' onClick={() => setFlip(!flip)}>View {playersInDay.length} players</Button>
									}
								</div>
							</>
						}
						{datesInDb?.length > 0 &&
							<div className="d-flex w-100 flex-column">
								<div className="fw-bold text-center mt-1 mb-1">Date che hai selezionato:</div>
								<div className='dates-in-db'>
									{datesInDb?.map((item, index) =>
										<div className="date" key={index}>
											<div>{printDate(item.date)}</div>
											<OverlayTrigger
												rootClose
												trigger="click"
												placement="right"
												overlay={
													<Popover className="popover_del_component">
														<Popover.Body>
															<div className="text-center">Do you really want to remove your availability for {item.date}?</div>
															<div className="d-flex justify-content-around mt-3">
																<Button variant="danger" onClick={handleRemoveAvailability}>Yes</Button>
																<Button variant="secondary" onClick={() => document.body.click()}>No</Button>
															</div>
														</Popover.Body>
													</Popover>}>
												<Button variant='danger' date-id={item.id}>
													<FontAwesomeIcon icon={faTimes} />
												</Button>
											</OverlayTrigger>
										</div>
									)}
								</div>
							</div>
						}
					</div>
					<div className='survey-form'>
						<div className="players-in-day">
							{playersInDay?.map((player, index) =>
								<Row className="player" key={index}>
									<Col sm={8}>
										<FontAwesomeIcon icon={faUser} />
										<span className="name-surname">{player.name} {player.surname}</span>
									</Col>
									<Col sm={4} className="text-end">
										<span className="username fw-bold">{player.username}</span>
									</Col>
								</Row>
							)}
						</div>
						<div className="down-btns">
							<Button variant='outline-primary' onClick={() => setFlip(!flip)}>Return to calendar</Button>
						</div>
					</div>
				</ReactCardFlip>
			</Col>
		</div>

	)
}

export default Survey
