import { React, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import "../../style/buttons.css";
import logo_black from '../../assets/logo/logo_black.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faHouse, faUser, faRightFromBracket, faRightToBracket, faCirclePlus, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Contexts/AuthContext";

const Header = () => {
	// debugger
	const { authInfo} = useAuth()

	return (
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
						{authInfo.isLoggedIn && authInfo.isAdmin &&
							<Nav.Link href="/newmatch">
								<FontAwesomeIcon icon={faVolleyball} />
								<span className="label">CREATE NEW MATCH</span>
							</Nav.Link>
						}
						<Nav.Link href={authInfo.isLoggedIn ? "/profile" : "/register"}>
							<FontAwesomeIcon icon={authInfo.isLoggedIn ? faUser : faCirclePlus} />
							<span className="label">{authInfo.isLoggedIn ? authInfo.authUser.name : "REGISTER"}</span>
						</Nav.Link>
						<Nav.Link href={authInfo.isLoggedIn ? "/logout" : "/login"}>
							<FontAwesomeIcon icon={authInfo.isLoggedIn ? faRightFromBracket : faRightToBracket} />
							<span className="label">{authInfo.isLoggedIn ? "LOGOUT" : "LOGIN"}</span>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
