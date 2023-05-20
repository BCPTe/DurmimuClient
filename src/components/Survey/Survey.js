import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row, OverlayTrigger, Overlay, Popover } from 'react-bootstrap'
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

	const [date, setDate] = useState(new Date())
	const [datesInDb, setDatesInDb] = useState([{ date: "2000-4-27" }])
	const [playersInDay, setPlayersInDay] = useState([{ name: auth.authUser.name, surname: auth.authUser.surname, username: auth.authUser.username }])

	const printDate = (dateToPrint) => {
		const temp = new Date(dateToPrint)
		return temp.toLocaleDateString()
	}

	const getUserDates = () => {
		api.get("/api/v1/surveys", {
			params: { username: auth.authUser.username }
		})
			.then(response => {
				setDatesInDb(response.data)
			})
	}

	const handleAddDate = () => {
		const payload = {
			user: auth.authUser.username,
			date: date
		}

		// TODO: IMPLEMENT IN BACKEND
		api.post("/api/v1/surveys/add", payload)
	}

	useEffect(() => {
		const payload = {
			date: date
		}

		// TODO: IMPLEMENT IN BACKEND
		api.get("/api/v1/surveys", {
			params: { date: date }
		})
			.then(response => {
				setPlayersInDay(response.data)
			})
	}, [date])


	useEffect(() => {
		getUserDates()
		// console.warn("ECCO LE DATE NEL DB: ", datesInDb?.length)
	}, [])

	// for flipcard
	const [flip, setFlip] = useState(false)
	//


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
								<Calendar className="custom-calendar" onChange={setDate} value={date} />
								<div className='calendar-btns'>
									<Button variant='secondary' onClick={handleAddDate}>Add</Button>
									<Button variant='outline-primary' onClick={() => setFlip(!flip)}>View {playersInDay.length} players</Button>
								</div>
							</>
						}
						{datesInDb.length > 0 &&
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
							{playersInDay.map((player, index) =>
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
