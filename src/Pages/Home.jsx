import React from 'react';
import WelcomeMessage from '../Components/WelcomeMessage';
import LogIn from '../Components/LogIn';


const Home = () => {
  return (
    <><><div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application.</p>
    </div>
      <WelcomeMessage /></>
      <LogIn /></>
  );
};

export default Home;