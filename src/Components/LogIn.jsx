import React, { useState } from 'react';


const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in as ${username}`);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Welcome Back</h2>

        <div style={styles.lineSeparator}></div>
        
        <label htmlFor="username" style={styles.label}>Username or Email</label>
        <input
          type="text"
          placeholder="Username or Email"
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
        
      </form>
    </div>
  );
};

// Styling
const styles = {
    container: {
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'center',
      height: '100vh', 
      backgroundColor: '#f3f4f6',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px',
      width: '100%',
      maxWidth: '350px',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FFFFFF',
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
      marginBottom: '5px',
      fontSize: '0.9em',
      color: '#35415D',
      fontFamily: 'Inter, sans-serif',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      borderRadius: '10px',
      border: '1px solid #ddd',
      outline: 'none',
      fontSize: '1em',
    },
};

export default LogIn;
