import axios from 'axios';

export default axios.create({
	baseURL: 'http://192.168.1.23:8080',
	headers: { 
		"ngrok-skip-browser-warning": "true",
		// "Access-Control-Allow-Origin" : "*",
		// "Access-Control-Allow-Headers" : "*",
		// "Access-Control-Allow-Methods" : "*",
		"Content-Type" : "application/json",
		"Authorization": 'Basic ' + window.btoa("user" + ":" + "3183035b-3525-42c6-bfdf-b9e38aee6a4a")
	}
})