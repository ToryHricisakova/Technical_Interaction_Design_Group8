import React from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { PageWithImage } from "../Components/SharedCSS";
import styled from "styled-components";

const Welcome = () => {
  return (
    <PageWithImage>
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
            <Button variant="primary-button">Login</Button>
          </Link>
          <Link to="/register">
            {" "}
            <Button variant="secondary-button">Register</Button>
          </Link>
        </ButtonContainer>
      </Container>
    </PageWithImage>
  );
};

export default Welcome;

// Styled components

const Container = styled.div`
  width: 500px;
  position: absolute;
  left: 50px;
  bottom: 50px;
  padding: 30px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MainTitle = styled.h1`
  font-size: 64px;
  margin: 0 0 5px 0;
  color: #35415d;
  text-align: left;
  font-family: Inter, sans-serif;
  font-weight: bold;
`;

const SubTitle = styled.h3`
  font-size: 32px;
  margin: 0 0 20px 0;
  font-family: Inter, sans-serif;
  font-weight: bold;
`;

const HighlightTextColor = styled.span`
  color: #e47347;
  font-weight: bold;
`;

const PrimaryTextColor = styled.span`
  color: #35415d;
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.5;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;
