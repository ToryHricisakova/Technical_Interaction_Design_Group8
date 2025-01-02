import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import {
  BarBackground,
  BarLeft,
  BarRight,
  ElementContainer,
  Logo,
} from "../Components/NavigationBars";

/**
 * Component for the navigationbar to be displayed at the top of the page whenever no user is logged in.
 */
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
            <Button variant="primary-button">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary-button">Register</Button>
          </Link>
        </ElementContainer>
      </BarRight>
    </BarBackground>
  );
};

export default Welcomebar;
