import { React, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import "../../style/buttons.css";
import logo_black from '../../assets/logo/logo_black.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faHouse, faUser, faRightFromBracket, faRightToBracket, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function Header() {
	const [isLogged, setIsLogged] = useState(false)
	const [name, setName] = useState("CHRISTIAN")

	return(
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand>
					<img className="logo" src={logo_black} height="50" alt="logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link href="/">
						<FontAwesomeIcon icon={faHouse} />
		 				<span className="label">HOME</span>
					</Nav.Link>
					<Nav.Link href="archive">
						<FontAwesomeIcon icon={faBoxArchive} />
		 				<span className="label">ARCHIVE</span>
					</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link href={isLogged ? "/profile" : "/register"}>
						<FontAwesomeIcon icon={isLogged ? faUser : faCirclePlus} />
						<span className="label">{isLogged ? {name} : "REGISTER"}</span>
					</Nav.Link>
					<Nav.Link href={isLogged ? "/logout" : "/login"}>
						<FontAwesomeIcon icon={isLogged ? faRightFromBracket : faRightToBracket} />
		 				<span className="label">{isLogged ? "LOGOUT" : "LOGIN"}</span>
					</Nav.Link>
				</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
