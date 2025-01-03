import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import ViewProfile from "./Pages/ViewProfile.jsx";
import { useState, useEffect } from "react";
import Parse from "parse";


// Parse setup
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_APPLICATION_ID = import.meta.env.VITE_PARSE_APPLICATION_ID;
const PARSE_JAVASCRIPT_KEY = import.meta.env.VITE_PARSE_JAVASCRIPT_KEY;

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const currentUser = Parse.User.current();
      setIsLoggedIn(!!currentUser);
    };
    checkLoginStatus();
  }, []);

  console.log("Is Logged In:", isLoggedIn);

  return (
    <Router>
      {isLoggedIn === null ? (
        <h1>Loading...</h1>
      ) : isLoggedIn ? (
        <>
          <Navbar setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/education" element={<ConversionCourses />} />
            <Route path="/people" element={<People />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/:userObjectId" element={<ViewProfile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </>
      ) : (
        <>
          <Welcomebar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/register"
              element={<Registration setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/onboarding1" element={<Onboarding1 />} />
            <Route
              path="/onboarding2"
              element={<Onboarding2 setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;