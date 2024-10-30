import './App.css'
import Welcomebar from './Components/Welcomebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
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