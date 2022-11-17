import React from "react";
import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Landing() {
  return (
    <div>
      <Container>
        <LinkContainer to="/login">
          <Button>Login</Button>
        </LinkContainer>
        <LinkContainer to="/register">
          <Button variant="danger">Register</Button>
        </LinkContainer>
      </Container>
    </div>
  );
}

export default Landing;
