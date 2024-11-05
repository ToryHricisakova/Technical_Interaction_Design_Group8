import React from 'react';
import WelcomeMessage from '../Components/WelcomeMessage';
import backgroundImage from '../MediaFiles/FrontpageBackground.png';

const Welcome = () => {
  return (
    <div style={styles.welcome}>
      <WelcomeMessage />
    </div>
  );
};

// Combined Styles
const styles = {
  welcome: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
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
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
  },
};

export default Welcome;