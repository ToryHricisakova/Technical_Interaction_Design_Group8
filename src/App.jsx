import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome.jsx";
import Home from "./Pages/Home.jsx";
import Welcomebar from "./Components/Welcomebar.jsx";
import Registration from "./Pages/Registration.jsx";
import Jobs from "./Pages/Jobs.jsx";
import ConversionCourses from "./Pages/ConversionCourses.jsx";
import Profile from "./Pages/Profile.jsx";
import People from "./Pages/People.jsx";
import Messages from "./Pages/Messages";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Onboarding1 from "./Pages/Onboarding1";
import Onboarding2 from "./Pages/Onboarding2";
import { useState } from "react";

function App() {
  document.body.style = "background: #D5DEE4";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        {/* Render the navigation bar based on login status */}
        {isLoggedIn ? (
          <Navbar setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Welcomebar />
        )}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/education" element={<ConversionCourses />} />
          <Route path="/people" element={<People />} />
          <Route path="/jobs" element={<Jobs />} /> 
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/messages" element={<Messages />} />
          <Route path="/onboarding1" element={<Onboarding1 />} /> 
          <Route path="/onboarding2" element={<Onboarding2 setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
