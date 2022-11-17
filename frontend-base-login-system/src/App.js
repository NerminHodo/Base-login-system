import { Routes, Route } from "react-router-dom";
import Landing from "./page/Landing Page/Landing";
import Login from "./page/Login/Login";
import Registration from "./page/Registration/Registration";
import Dashboard from "./page/Dashboard/Dashboard";
import Profile from "./page/Profile/Profile";
import About from "./page/About/About";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="About" element={<About />} />

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
