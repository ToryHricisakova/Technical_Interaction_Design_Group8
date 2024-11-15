import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Button from "./Button";

const WelcomeMessage = () => {
  return (
    <div style={styles.welcomeMessageContainer}>
      <h1 style={styles.mainTitle}>Welcome</h1>
      <h3 style={styles.subTitle}>
        <span style={styles.highlight}>Join</span>{" "}
        <span style={styles.secondary}>the</span>{" "}
        <span style={styles.highlight}>community</span>
      </h3>
      <p style={styles.paragraph}>
        Welcome to CrossConnect, the social hub for cross-disciplinary
        professionals!
      </p>
      <p style={styles.paragraph}>
        Add tags to your profile to showcase the fields you work in, whether
        it’s law, IT, marketing, or beyond.
      </p>
      <p style={styles.paragraph}>
        Connect with colleagues across industries, discover opportunities, and
        explore job posts tailored to your unique skill set.
      </p>

      {/* Button Container */}
      <div style={styles.buttonContainer}>
        <Link to="/login">
          {" "}
          {/* Wrap PrimaryButton in Link */}
          <Button className="primary-button">Login</Button>
        </Link>
        <Link to="/register">
          {" "}
          {/* Wrap SecondaryButton in Link */}
          <Button className="secondary-button">Register</Button>
        </Link>
      </div>
    </div>
  );
};

// Styles (remains unchanged)
const styles = {
  welcomeMessageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // 70% opacity
    borderRadius: "20px",
    padding: "30px",
    width: "500px",
    position: "absolute",
    bottom: "50px",
    left: "50px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  mainTitle: {
    fontSize: "4em",
    margin: "0 0 10px 0",
    color: "#35415D",
    textAlign: "left",
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: "2em",
    margin: "0 0 20px 0",
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
  },
  highlight: {
    color: "#E47347",
    fontWeight: "bold",
  },
  secondary: {
    color: "#35415D",
  },
  paragraph: {
    fontSize: "1em",
    margin: "10px 0",
    lineHeight: "1.5",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px", // Spacing between buttons
    marginTop: "20px",
  },
};

export default WelcomeMessage;
