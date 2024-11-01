import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome.jsx';
import Welcomebar from './Components/WelcomeBar.jsx';
import Registration from './Pages/Registration.jsx';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Router>
        {/* Render the navigation bar based on login status */}
        {isLoggedIn ? (
          <Navbar handleLogout={handleLogout} /> // Render Navbar if logged in
        ) : (
          <Welcomebar />
        )}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;