import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Welcomebar = () => {
  return (
    <nav style={styles.welcomebar}>
      {/* Left Side: Logo */}
      <div style={styles.welcomebarLeft}>
        <Link to="/">
          <img src="src/MediaFiles/Logo.png" alt="Logo" style={styles.logo} />
        </Link>
      </div>

      {/* Right Side: Login and Register */}
      <div style={styles.welcomebarRight}>
        <div style={styles.buttonContainer}>
          <Link to="/login">
            {" "}
            <Button className="primary-button">Login</Button>{" "}
          </Link>
          <Link to="/register">
            {" "}
            <Button className="secondary-button">Register</Button>{" "}
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Styling
const styles = {
  welcomebar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px", // 10px 20px originally
    width: "100vw",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  welcomebarLeft: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    cursor: "pointer",
  },
  welcomebarRight: {
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginRight: "20px",
  },
};

export default Welcomebar;
