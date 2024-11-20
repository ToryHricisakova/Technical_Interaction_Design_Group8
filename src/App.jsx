import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Home from "./Pages/Home.jsx";
import Registration from "./Pages/Registration";
import Jobs from "./Pages/Jobs";
import ConversionCourses from "./Pages/ConversionCourses.jsx";
import Profile from "./Pages/Profile.jsx";
import People from "./Pages/People.jsx";
import Messages from "./Pages/Messages";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Welcomebar from "./Components/Welcomebar";
import Onboarding1 from "./Pages/Onboarding1";
import Onboarding2 from "./Pages/Onboarding2";
import { useState, useEffect } from "react";
import Parse from "parse";
//import Parse from "parse/dist/parse.min.js";

// Parse setup
const PARSE_APPLICATION_ID = "ZsZHSwKRAw2ROTRjAeClzoVKIhwDYmBhEGUcjwHH";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "uQVGHspYWtfsxUVGSTDj1U0eiDSKZLFngeCaL6uP";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const currentUser = Parse.User.current();
    setIsLoggedIn(!(currentUser === null)); // Set to `true` if user exists, otherwise `false`
  }, []);

  return (
    <div>
      <Router>
        {isLoggedIn ? <Navbar setIsLoggedIn={setIsLoggedIn} /> : <Welcomebar />}

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/education" element={<ConversionCourses />} />
          <Route path="/people" element={<People />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route
            path="/onboarding2"
            element={<Onboarding2 setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
