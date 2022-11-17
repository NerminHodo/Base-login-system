import React from "react";
import { Container } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

function Profile() {
  const { auth } = useAuth();
  return (
    <div>
      <Container>{auth.id}</Container>
    </div>
  );
}

export default Profile;
