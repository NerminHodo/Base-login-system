import React from "react";
import { Button, Container } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { auth } = useAuth();
  const dateCreated = new Date(auth.created);
  const dateUpdated = new Date(auth.updated);

  const navigate = useNavigate();
  function test() {
    navigate("/profile/editprofile");
  }

  const createdDate = `${dateCreated.getDate()}/${
    dateCreated.getMonth() + 1
  }/${dateCreated.getFullYear()}`;

  const updatedDate = `${dateUpdated.getDate()}/${
    dateUpdated.getMonth() + 1
  }/${dateUpdated.getFullYear()}`;

  return (
    <div>
      <Container>
        <div className="d-flex mainDiv">
          <div className="leftDiv">
            <p>Name: {auth.name}</p>
            <p>Email: {auth.email}</p>
            <p>Profile created: {createdDate}</p>
            <p>Last profile update: {auth.updated ? updatedDate : ""}</p>
            <Button onClick={test}>Edit profile</Button>
          </div>
          <div className="rightDiv">
            {" "}
            <div>2</div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
