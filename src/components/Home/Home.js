import "./Home.css";
import React from "react";
import Match from "../Match/Match";

const Home = (props) => {
	return (
		<>
		{props.user}
		<Match />
		</>
	);
};

export default Home;
