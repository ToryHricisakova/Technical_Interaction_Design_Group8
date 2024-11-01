import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import CloseIcon from './CloseIcon';

const LogInForm = ({ setIsLoggedIn, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in...`);
    setIsLoggedIn(true); 
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <CloseIcon onClick={onClose} />
        <h2 style={styles.title}>Welcome Back</h2>
        <div style={styles.lineSeparator}></div>

        <label htmlFor="email" style={styles.label}>Email</label>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {/* Primary Button */}
        <PrimaryButton type="submit">Log In</PrimaryButton>
      </form>
    </div>
  );
};

// Styling
const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
      position: 'relative',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FFFFFF',
      position: 'relative',
    },
    title: {
      fontSize: '2em',
      marginBottom: '10px',
      color: '#35415D',
      fontFamily: 'Inter, sans-serif',
    },
    lineSeparator: {
      width: '100%',
      height: '1px', 
      backgroundColor: '#E47347',
      marginBottom: '20px', 
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: '0.9em',
      color: '#35415D',
      fontFamily: 'Inter, sans-serif',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '10px',
      border: '1px solid #ddd',
      outline: 'none',
      fontSize: '1em',
    },
};

export default LogInForm;