import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function BootstrapNavbar({ isLoggedIn }) {
  return (
    <Navbar
      style={{ position: "sticky" }}
      collapseOnSelect
      expand="sm"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand><img src = "/Picture1.png" width="150"/></Navbar.Brand>
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
                <NavDropdown.Item href="#action/3.1">War</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Go Fish</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  52 Card Pickup
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Etc.</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            {isLoggedIn && <Nav.Link href="#deets">My Account</Nav.Link>}
            {isLoggedIn && (
              <Nav.Link eventKey={2} href="#memes">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
