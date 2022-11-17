import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../API";

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [response, setResponse] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (response.status === 400) {
      console.log("400");
    } else if (response.status === 200) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (form.checkValidity() === true) {
      login({ email: email, password: password }, setResponse);
    }
    setValidated(true);
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(() => {
      return e.target.value;
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(() => {
      return e.target.value;
    });
  };

  return (
    <div>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={handleEmailChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide password
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
