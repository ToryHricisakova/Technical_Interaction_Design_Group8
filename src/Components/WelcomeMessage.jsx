import React from "react";

const WelcomeMessage = () => {
    return (
        <div style={styles.container}>
          <h1 style={styles.mainTitle}>Welcome</h1>
          <h3 style={styles.subTitle}>
            <span style={styles.highlight}>Join</span> <span style={styles.secondary}>the</span> <span style={styles.highlight}>community</span>
          </h3>
          <p style={styles.paragraph}>
            Welcome to CrossConnect, the social hub for cross-disciplinary professionals!
          </p>
          <p style={styles.paragraph}>
            Add tags to your profile to showcase the fields you work in, whether it’s law, IT, marketing, or beyond.
          </p>
          <p style={styles.paragraph}>
            Connect with colleagues across industries, discover opportunities, and explore job posts tailored to your unique skill set.
          </p>
        </div>
      );
};

// Styling
const styles = {
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // 70% opacity
        borderRadius: '20px',
        padding: '30px',
        width: '400px', 
        position: 'absolute',
        bottom: '75px', 
        left: '75px', 
        textAlign: 'left',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    mainTitle: {
      fontSize: '4em',
      margin: '0 0 10px 0',
      color: '#35415D',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 'bold',
    },
    subTitle: {
      fontSize: '2em',
      margin: '0 0 20px 0',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 'bold',
    },
    highlight: {
      color: '#E47347',
      fontWeight: 'bold',
    },
    secondary: {
      color: '#35415D',
    },
    paragraph: {
      fontSize: '1em',
      margin: '10px 0',
      lineHeight: '1.5',
      color: '#333',
    },
  };

export default WelcomeMessage;