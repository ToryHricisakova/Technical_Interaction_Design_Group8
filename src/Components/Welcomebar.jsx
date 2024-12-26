import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import {
  BarBackground,
  BarLeft,
  BarRight,
  ElementContainer,
  Logo,
} from "../SharedCSS";

// Welcomebar to be displayed at the top of the page when no user is logged in.
const Welcomebar = () => {
  return (
    <BarBackground>
      <BarLeft>
        <Link to="/">
          <Logo src="src/MediaFiles/Logo.png" alt="Logo" />
        </Link>
      </BarLeft>

      <BarRight>
        <ElementContainer>
          <Link to="/login">
            <Button className="primary-button">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="secondary-button">Register</Button>
          </Link>
        </ElementContainer>
      </BarRight>
    </BarBackground>
  );
};

export default Welcomebar;
