import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    if (Cookies.get("token")) {
      const token = jwtDecode(Cookies.get("token"));

      const accessToken = Cookies.get("token");
      const name = token.name;
      const id = token._id;
      const email = token.email;
      const created = token.created;
      const updated = token.updated;
      setAuth({ id, name, email, accessToken, created, updated });
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
