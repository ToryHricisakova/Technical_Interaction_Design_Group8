import './App.css'
import { useState } from 'react'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar.jsx'
import Home from './Pages/Home.jsx'
import Jobs from './Pages/Jobs.jsx'
import ConversionCourses from './Pages/ConversionCourses.jsx'
import Profile from './Pages/Profile.jsx'
import People from './Pages/People.jsx'
import Welcomebar from './Components/Welcomebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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
      
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer"></a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    <Router>
      
        <Welcomebar />
        <Routes>
          <Route path="/home" element={<Welcomebar />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} /> */}
        </Routes>
      
    </Router>
    </>
)}


//   return (
//     <>
//     <Router>
//       {isLoggedIn ? (
//         <>
//           <Navbar />  {/* NAVIGATION BAR */}
//           <Routes>
//             <Route path="/home" element={<Home />} />
//             <Route path="/education" element={<ConversionCourses />} />
//             <Route path="/people" element={<People />} />
//             <Route path="/jobs" element={<Jobs />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </>
//       ) : (
//         <>
//         <Welcomebar onlogin={handleLogin} />
//         <Routes>
//           <Route path="/home" element={<Welcomebar />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Login />} />
//         </Routes>
//         </>
//     )}
//     </Router>
//     </>
// )}

export default App