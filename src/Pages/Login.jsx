import React from 'react';
import LogInForm from '../Components/LogInForm';
import backgroundImage from '../MediaFiles/FrontpageBackground.png';
import { useNavigate } from 'react-router-dom'; 

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };
  
    return (
        <div style={styles.loginPage}>
            <LogInForm setIsLoggedIn={setIsLoggedIn} onClose={handleClose} />
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