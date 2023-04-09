import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:8080',
	headers: { 
		"ngrok-skip-browser-warning": "true",
		// "Access-Control-Allow-Origin" : "*",
		// "Access-Control-Allow-Headers" : "*",
		// "Access-Control-Allow-Methods" : "*",
		"Content-Type" : "application/json",
		"Authorization": 'Basic ' + window.btoa("user" + ":" + "c43c79c5-7ceb-44fc-9141-8845aee99523")
	}
})