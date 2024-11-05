import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate(); // Use navigate to programmatically change routes

  const handleLogout = () => {
    setIsLoggedIn(false); // Reset the login state
    navigate('/'); // Navigate to home or login page
  };

  return (
    <nav style={styles.navbar}>
      
    <div style={styles.navbarLeft}>
        <Link to="/home">
          <img src="src/MediaFiles/Logo.png" alt="Logo" style={styles.logo} />
        </Link>
    </div>

    <div style={styles.navbarRight}>
       <div style={styles.iconContainer}>
          <Link to="/education">
            <img src="src/MediaFiles/ConversionCourses.png" alt="ConversionCourses" style={styles.icon} />
          </Link>
          <Link to="/people">
            <img src="src/MediaFiles/Network.png" alt="Network" style={styles.icon} />
          </Link>
          <Link to="/jobs">
            <img src="src/MediaFiles/Jobs.png" alt="Jobs" style={styles.icon} />
          </Link>
          <Link to="/messages">
            <img
              src="src/MediaFiles/Messages.png"
              alt="Messages"
              style={styles.icon}
            />
          </Link>
          <img
            src="src/MediaFiles/Notifications.png"
            alt="Notifications"
            style={styles.icon}
          />
          <Link to="/profile">
            <img src="src/MediaFiles/Profile.png" alt="Profile" style={styles.profileImage} />
          </Link>
        <input type="text" placeholder="Start typing..." style={styles.searchBar} />
        <SecondaryButton onClick={handleLogout}>Log Out</SecondaryButton>
        </div>
        <input
          type="text"
          placeholder="Start typing..."
          style={styles.searchBar}
        />
      </div>
    </nav>
  );
};


// Styling
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    width: "100vw",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  navbarLeft: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    cursor: "pointer",
  },
  navbarRight: {
    display: "flex",
    alignItems: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginRight: "20px",
  },
  icon: {
    height: "25px",
    cursor: "pointer",
  },
  profileImage: {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  searchBar: {
    padding: "10px 40px 10px 10px",
    border: "1px solid #34415D",
    borderRadius: "20px",
    outline: "none",
    width: "200px",
    backgroundColor: "#f9f9f9",
    //boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    //transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
};

export default Navbar;
