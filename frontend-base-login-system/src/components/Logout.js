import React from "react";
import { Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

export default function Logout() {
  const { setAuth } = useAuth();
  function handleLogout() {
    setAuth({});
  }
  return (
    <div>
      <Button variant="dark" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}
