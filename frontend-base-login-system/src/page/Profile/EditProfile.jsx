import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axios";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";

const PUT_URL = "/api/users/:userId";

function EditProfile() {
  const [name2, setName] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const PUT_URL = `/api/users/${auth.id}`;

  const handleNameChange = (e) => {
    setName(() => {
      return e.target.value;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        PUT_URL,
        JSON.stringify({ name: name2 }),
        {
          headers: {
            Authorization: "Bearer " + auth.accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      Cookies.remove('token')
      console.log(response);

      const accessToken = response?.data?.token;
      const id = response?.data?._id;
      const name = response?.data?.name;
      const email = response?.data?.email;
      const created = response?.data?.created;
      const updated = response?.data?.updated;
      setAuth({ id, name, email, accessToken, created, updated });
      Cookies.set("token", accessToken, {
        expires: new Date(new Date().getTime() + 15 * 60 * 1000),
      });

      setName("");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EditProfile;
