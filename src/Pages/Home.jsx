import React from 'react';
import WelcomeMessage from '../Components/WelcomeMessage';
import LogIn from '../Components/LogIn';
import Navbar from './Components/Navbar.jsx'
import Jobs from './Pages/Jobs.jsx'
import ConversionCourses from './Pages/ConversionCourses.jsx'
import Profile from './Pages/Profile.jsx'
import People from './Pages/People.jsx'


const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application.</p>
    </div>
  );
};

export default Home;