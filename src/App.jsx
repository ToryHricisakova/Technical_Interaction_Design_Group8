import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar.jsx'
import Home from './Pages/Home.jsx'
import Jobs from './Pages/Jobs.jsx'
import ConversionCourses from './Pages/ConversionCourses.jsx'
import Profile from './Pages/Profile.jsx'
import People from './Pages/People.jsx'

function App() {

  return (
    <>
      <Router>
        <Navbar />  {/* NAVIGATION BAR */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/education" element={<ConversionCourses />} />
          <Route path="/people" element={<People />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    
    </>
)}

export default App