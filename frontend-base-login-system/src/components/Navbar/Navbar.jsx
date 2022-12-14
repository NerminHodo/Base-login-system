import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Navbar.css";
import useAuth from "../../hooks/useAuth";
import Logout from "../Logout/Logout";

function Navigation() {
  const { auth } = useAuth();
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Nav className="me-auto">
            <div className="d-flex">
              <LinkContainer to="/">
                <Navbar.Brand>My App</Navbar.Brand>
              </LinkContainer>

              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </div>

            {auth?.id ? (
              <div className="d-flex">
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <div>
                  <Logout />
                </div>
              </div>
            ) : (
              <Container />
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
