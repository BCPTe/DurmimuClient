import { React, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import "../../style/buttons.css";
import logo_black from '../../assets/logo/logo_black.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faHouse, faUser, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Header() {
	const [isLogged, setIsLogged] = useState(true)

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
				<Nav activekey="">
					<Nav.Link href="#profile">
						<FontAwesomeIcon icon={faUser} />
						<span className="label">CHRISTIAN</span>
					</Nav.Link>
					<Nav.Link href="#logout">
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
