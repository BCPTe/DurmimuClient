import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import api from '../../API/axiosConfig'
import { useAuth } from '../../Contexts/AuthContext'
import './Survey.css'
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const Survey = () => {
	const { authStatus } = useAuth()
	const auth = authStatus()

	const [date, setDate] = useState(new Date())
	const [datesInDb, setDatesInDb] = useState([])

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

		api.post("", payload)
	}

	useEffect(() => {
		getUserDates()
		// console.warn("ECCO LE DATE NEL DB: ", datesInDb?.length)
	}, [])

	// useEffect(() => {
	// 	// getUserDates()
	// 	console.warn("ECCO LE DATE NEL DB: ", datesInDb)
	// }, [datesInDb])

	return (
		<div className='survey-container'>
			<Col xs={10} md={6} lg={4} className='min-50'>
				<div className='survey-form'>
					{datesInDb?.length < 2 &&
						<>
							<Calendar className={"custom-calendar"} onChange={setDate} value={date} />
							<div className='calendar-btns'>
								<Button variant='secondary' onClick={handleAddDate}>Add</Button>
							</div>
						</>
					}
					{datesInDb.length > 0 &&
						<div className="d-flex w-100 flex-column">
							<div className="fw-bold text-center mt-3 mb-1">Date che hai selezionato:</div>
							<div className='dates-in-db'>
								{datesInDb?.map(item =>
									<div className="date" key={item.id}>
										<div>{printDate(item.date)}</div>
										<Button variant='danger' key={item.id}>
											<FontAwesomeIcon icon={faTimes} />
										</Button>
									</div>
								)}
							</div>
						</div>
					}
				</div>
			</Col>
		</div>

	)
}

export default Survey
