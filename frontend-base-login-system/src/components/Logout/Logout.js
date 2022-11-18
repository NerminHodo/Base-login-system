import React from "react";
import { Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie"
import "./style.css"

export default function Logout() {
  const { setAuth, auth } = useAuth();

  function handleLogout() {
    setAuth({});
    Cookies.remove("token")
  }
  return (
    <div className="logout">
      <p className="par">{auth.name}</p>
      <Button variant="dark" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}
