import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import CloseIcon from './CloseIcon';
import { Link } from 'react-router-dom';
import HorizontalLine from './HorizontalLine';
import { useNavigate } from 'react-router-dom';

const LogInForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in...`);
    setIsLoggedIn(true);
    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <Link to="/">
          <CloseIcon />
        </Link>
        <h2 style={styles.title}>Welcome Back</h2>
        {/* <div style={styles.lineSeparator}></div> */}
        <HorizontalLine width="400px"/>
        <div style={styles.fieldContainer}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={styles.fieldContainer}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={styles.fieldContainer}>
          <p><u>Forgot password?</u></p>
        </div>

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
    fontSize: '2.5em',
    marginBottom: '10px',
    color: '#35415D',
    fontFamily: 'Inter, sans-serif',
  },
  lineSeparator: {
    width: '100%',
    height: '1px', 
    backgroundColor: '#E47347',
    marginBottom: '20px', 
    fieldContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px', 
      alignItems: 'flex-start', 
    },
  },
  fieldContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px', 
    alignItems: 'flex-start',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: '0.9em',
    color: '#35415D',
    fontFamily: 'Inter, sans-serif',
  },
  input: {
    width: '100%',
    maxWidth: '350px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '10px',
    border: '1px solid #838383',
    outline: 'none',
    fontSize: '1em',
  },
};

export default LogInForm;