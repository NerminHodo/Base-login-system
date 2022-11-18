import { Routes, Route } from "react-router-dom";
import Landing from "./page/Landing Page/Landing";
import Login from "./page/Login/Login";
import Registration from "./page/Registration/Registration";
import Dashboard from "./page/Dashboard/Dashboard";
import Profile from "./page/Profile/Profile";
import EditProfile from "./page/Profile/EditProfile";
import About from "./page/About/About";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout";
import NotFound404 from "./page/404 NotFound/NotFound404";
import RequireAuth from "./components/RequireAuth";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <Route path="/about" element={<About />} />

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/editprofile" element={<EditProfile />} />
          </Route>
          <Route path="/*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
