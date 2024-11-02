import React from 'react';
import RegistrationForm from '../Components/RegistrationForm';
import backgroundImage from '../MediaFiles/FrontpageBackground.png';

const Registration = () => {
  return (
    <div style={styles.registration}>
      <RegistrationForm />
      {/* <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} />
            </Routes>
          
        </Router>
      */}
    </div>
  );
};

const styles = {
  registration: {
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
  form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      width: '100%',
      maxWidth: '700px',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FFFFFF',
      marginTop: '20px', // Add top margin
      marginBottom: '20px', // Add bottom margin
  },
};

export default Registration;