import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Components.css";

function NavbarStudent() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="University Logo"
              src="/universityLogo.jpg"
              width="100"
              height="100"
              className="NavBarImage"
            />{" "}
          </Navbar.Brand>
          <h1 className="NavBarHeader">Students</h1>
        </Container>
        
      </Navbar>
    </>
  );
}

export default NavbarStudent;
