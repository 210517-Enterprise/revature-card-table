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
            <img
              className="nav-bar-img"
              src="/Picture1.png"
              style={{ width: "175px" }}
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!isLoggedIn && (
              <LinkContainer to="/rules">
                <Nav.Link href="">Rules</Nav.Link>
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
                <LinkContainer to="/matching-game">
                  <NavDropdown.Item>Concentration</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/rules">Rules</NavDropdown.Item>
              </NavDropdown>
            )}
            <LinkContainer to="/leaderboard">
              <Nav.Link>Leaderboard</Nav.Link>
            </LinkContainer>
            {!isLoggedIn && (
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            )}
            
          </Nav>
          <Nav className="ml-auto">
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
