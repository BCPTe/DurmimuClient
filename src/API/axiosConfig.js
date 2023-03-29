import axios from 'axios';

export default axios.create({
	baseURL: 'https://a128-37-119-136-71.eu.ngrok.io',
	headers: { "ngrok-skip-browser-warning": "true" }

})