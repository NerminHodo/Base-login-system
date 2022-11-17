import axios from "axios";

export function createAccount(payload, setResponse) {
  axios
    .post("http://localhost:5000/api/users/register", payload)
    .then(function (response) {
      setResponse(response);
    })
    .catch(function (error) {
      setResponse(error.response);
    });
}

export function login(payload, setResponse) {
  axios
    .post("http://localhost:5000/auth/login", payload)
    .then(function (response) {
      console.log(response);
      setResponse(response);
    })
    .catch(function (error) {
      setResponse(error.response);
      console.log(error);
    });
}
