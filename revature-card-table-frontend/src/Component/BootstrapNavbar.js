import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../CSS/NavBar.css";

export default function BootstrapNavbar({ isLoggedIn, setToken, token }) {
  function logOut() {
    setToken({
      username: ``,
      id: ``,
      isLoggedIn: false,
    });
  }

  return (
    <Navbar
      className="custom-navbar"
      style={{ position: "sticky" }}
      fixed="top"
      collapseOnSelect
      expand="sm"
      variant="dark"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src="/Picture1.png" width="200" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/rules">
              <Nav.Link href="">Rules</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/leaderboard">
              <Nav.Link>Leaderboard</Nav.Link>
            </LinkContainer>
            {!isLoggedIn && (
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            )}
            {isLoggedIn && (
              <NavDropdown title="Games" id="collasible-nav-dropdown">
                <LinkContainer to="/war">
                  <NavDropdown.Item>War</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/speed">
                  <NavDropdown.Item>Speed</NavDropdown.Item>
                </LinkContainer>
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
              <Nav.Link eventKey="disabled" disabled>
                Welcome Back, {token.first_name}!    
              </Nav.Link>
            )}
            {isLoggedIn && (
              <LinkContainer to="/my-account">
                <Nav.Link>My Account</Nav.Link>
              </LinkContainer>
            )}

            {!isLoggedIn && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {isLoggedIn && (
              <LinkContainer to="/">
                <Nav.Link onSelect={logOut}>Logout</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
