import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "70px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2"></NavLink>
          <Nav className="me-auto mx-auto">
            <NavLink  to="/" className="text-decoration-none text-light text-center" style={{ fontSize: "48px", fontWeight: "bold", letterSpacing: "2px" }}>Leave  Management  Portal</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
