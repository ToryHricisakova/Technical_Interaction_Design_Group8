import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { BarBackground, BarLeft, BarRight, ElementContainer, Logo } from "../sharedCSS";


const Welcomebar = () => {
  return (
    <BarBackground>
      <BarLeft>
      <Link to="/">
          <Logo 
            src="src/MediaFiles/Logo.png" 
            alt="Logo"
          />
      </Link>
      </BarLeft>

      <BarRight>
        <ElementContainer>
          <Link to="/login"> 
            <PrimaryButton>Login</PrimaryButton> 
          </Link>
          <Link to="/register"> 
            <SecondaryButton>Register</SecondaryButton> 
          </Link>
        </ElementContainer>
      </BarRight>
    </BarBackground>
  );
};

export default Welcomebar;