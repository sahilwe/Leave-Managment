import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: '50px' }}>
        <Container>
          <Nav className="w-100 justify-content-between">
            <Nav.Item>
              <NavLink
                to="/Admin/Home"
                className="text-decoration-none text-light"
                style={{ fontSize: '24px' }} // Adjust the font size as needed
              >
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/Admin/Logs"
                className="text-decoration-none text-light"
                style={{ fontSize: '24px' }} // Adjust the font size as needed
              >
                Leave-Logs
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to="/"
                className="text-decoration-none text-light"
                style={{ fontSize: '24px' }} // Adjust the font size as needed
              >
                Log-out
              </NavLink>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
