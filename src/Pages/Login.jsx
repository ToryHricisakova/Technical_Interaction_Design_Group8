import React from 'react';
import LogInForm from '../Components/LogInForm';
import backgroundImage from '../MediaFiles/FrontpageBackground.png';

const Login = ({ setIsLoggedIn }) => {
  
    return (
        <div style={styles.loginPage}>
            <LogInForm setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
};

// Styling
const styles = {
    loginPage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      width: '100vw',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      position: 'relative', 
    },
};

export default Login;