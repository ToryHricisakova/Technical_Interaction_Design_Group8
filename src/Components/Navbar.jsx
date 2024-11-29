import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";
import {
  BarBackground,
  BarLeft,
  BarRight,
  ElementContainer,
  Logo,
} from "../SharedCSS";
import Parse from "parse";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async function () {
    try {
      await Parse.User.logOut();
      const currentUser = Parse.User.current();
      if (currentUser === null) {
        setIsLoggedIn(false);
      }
      navigate("/");
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <BarBackground>
      <BarLeft>
        <Link to="/home">
          <Logo src="src/MediaFiles/Logo.png" alt="CrossConect Logo" />
        </Link>
      </BarLeft>

      <BarRight>
        <ElementContainer>
          <Link to="/education">
            <Icon
              className="bi bi-mortarboard-fill"
              aria-label="ConversionCourses"
              title="Conversion Courses"
            />
          </Link>
          <Link to="/people">
            <Icon 
              className="bi bi-people-fill" 
              aria-label="Network" 
              title="Network" />
          </Link>
          <Link to="/jobs">
            <Icon 
              className="bi bi-briefcase-fill" 
              aria-label="Jobs"
              title="Jobs" />
          </Link>
          <Link to="/messages">
            <Icon 
              className="bi bi-chat-fill" 
              aria-label="Messages"
              title="Messages" />
          </Link>
            
            <Icon 
              className="bi bi-bell-fill" 
              aria-label="Notifications"
              title="Notifications" />

          <Link to="/profile">
            <ProfileImage 
              src="src/MediaFiles/Profile.png" 
              alt="Profile"
              title="Profile" />
          </Link>

          <SearchBar type="text" placeholder="Start typing..." />

          <Button className="secondary-button" onClick={handleLogout}>
            Log Out
          </Button>
        </ElementContainer>
      </BarRight>
    </BarBackground>
  );
};

// Styled Components for Navbar

const Icon = styled.i`
  font-size: 24px;
  cursor: pointer;
  color: #34415d;
  &:hover {
    color: #e47347;
  }
`;

const ProfileImage = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

const SearchBar = styled.input`
  padding: 10px 40px 10px 10px;
  border: 1px solid #34415d;
  border-radius: 20px;
  outline: none;
  width: 200px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
`;

export default Navbar;
