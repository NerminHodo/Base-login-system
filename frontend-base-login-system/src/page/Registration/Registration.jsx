import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axios";
const REGISTER_URL = "/api/users/register";

export default function Registration() {
  const [validated, setValidated] = useState(false);
  const [response, setResponse] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (response.status === 400) {
      if (response.data.error === "User exists") {
        setEmailError(true);
      }
    } else if (response.status === 200) {
      setEmailError(false);
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    if (form.checkValidity() === true) {
      try {
        const response = await axios.post(
          REGISTER_URL,
          JSON.stringify({ name, email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setResponse(response);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      } catch (error) {
        setResponse(error.response);
        console.log(error);
      }
    }
    setValidated(true);
  };

  const handleNameChange = (e) => {
    setName(() => {
      return e.target.value;
    });
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
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              required
              onChange={handleNameChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={handleEmailChange}
              style={{ borderColor: emailError ? "red" : "none" }}
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
          <p style={{ display: emailError ? "block" : "none" }}>
            This Email is already registered
          </p>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
