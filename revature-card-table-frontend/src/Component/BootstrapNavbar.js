import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function BootstrapNavbar({ isLoggedIn, setToken }) {
  return (
    <Navbar
      style={{ position: "sticky" }}
      fixed="top"
      collapseOnSelect
      expand="sm"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src="/Picture1.png" width="150" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!isLoggedIn && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {!isLoggedIn && (
              <LinkContainer to="/register">
                <Nav.Link href="#register">Register</Nav.Link>
              </LinkContainer>
            )}
            {isLoggedIn && (
              <NavDropdown title="Games" id="collasible-nav-dropdown">
                <LinkContainer to="/war">
                  <NavDropdown.Item>War</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item href="#action/3.2">Go Fish</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  52 Card Pickup
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Rules</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav className="ml-auto">
            {isLoggedIn && (
              <LinkContainer to="/my-account">
                <Nav.Link>My Account</Nav.Link>
              </LinkContainer>
            )}
            {isLoggedIn && (
              <LinkContainer to="/">
                <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function logOut({setToken}) {
  setToken({
    username: ``,
    id: ``,
    isLoggedIn: false,
  });
}
