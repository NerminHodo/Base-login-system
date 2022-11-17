import { Routes, Route } from "react-router-dom";
import Landing from "./page/Landing Page/Landing";
import Login from "./page/Login/Login";
import Registration from "./page/Registration/Registration";
import Dashboard from "./page/Dashboard/Dashboard";
import Profile from "./page/Profile/Profile";
import About from "./page/About/About";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="About" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
