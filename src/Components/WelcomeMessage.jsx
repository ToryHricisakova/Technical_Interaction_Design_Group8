import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import {
  Container,
  MainTitle,
  SubTitle,
  HighlightTextColor,
  PrimaryTextColor,
  Paragraph,
  ButtonContainer,
} from "../WelcomeMessageCSS.jsx";

const WelcomeMessage = () => {
  return (
    <Container>
      <MainTitle>Welcome</MainTitle>
      <SubTitle>
        <HighlightTextColor>Join</HighlightTextColor>{" "}
        <PrimaryTextColor>the</PrimaryTextColor>{" "}
        <HighlightTextColor>community</HighlightTextColor>
      </SubTitle>
      <Paragraph>
        Welcome to CrossConnect, the social hub for cross-disciplinary
        professionals!
      </Paragraph>
      <Paragraph>
        Add tags to your profile to showcase the fields you work in, whether
        it’s law, IT, marketing, or beyond.
      </Paragraph>
      <Paragraph>
        Connect with colleagues across industries, discover opportunities, and
        explore job posts tailored to your unique skill set.
      </Paragraph>

      <ButtonContainer>
        <Link to="/login">
          {" "}
          <Button className="primary-button">Login</Button>
        </Link>
        <Link to="/register">
          {" "}
          <Button className="secondary-button">Register</Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default WelcomeMessage;
