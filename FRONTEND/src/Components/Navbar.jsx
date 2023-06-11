import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Components.css";
import { Link } from "react-router-dom";

const NavbarStudent = (text) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/">
              <img
                alt="University Logo"
                src="/universityLogo.jpg"
                width="100"
                height="100"
                className="NavBarImage"
              />
            </Link>
          </Navbar.Brand>
          <h1 className="NavBarHeader">{text.text}</h1>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarStudent;
