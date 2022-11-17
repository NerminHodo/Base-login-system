import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../API/axios";
const LOGIN_URL = "/auth/login";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    if (form.checkValidity() === true) {
      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const accessToken = response?.data?.token;
        const id = response?.data?.user._id;
        const name = response?.data?.user.name;
        setAuth({ id, name, email, accessToken });
        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
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
