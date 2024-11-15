import { useState } from "react";
import HorizontalLine from "../Components/HorizontalLine";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Components/Button";
import TypeAhead from "../Components/TypeAhead";
import fields from "../MediaFiles/fields";
import { Link } from "react-router-dom";
import skills from "../MediaFiles/skills";
import styled from "styled-components";
import {
  Container,
  Form,
  MainTitle,
  Paragraph,
  Boldparagraph,
  Section,
} from "../OnboardingCSS";

const Onboarding2 = ({ setIsLoggedIn }) => {
  const handleFinish = () => {
    setIsLoggedIn(true);
  };

  return (
    <Container>
      <Form>
        <MainTitle>Customize Profile - Career Fields</MainTitle>
        <HorizontalLine />
        <Section>
          <Boldparagraph>Field of work/study</Boldparagraph>
          <Paragraph>
            Add the professional fields that you are working or studying in. The
            fields you add will help others to find you based on your
            combination of areas of expertise.
          </Paragraph>
          <TypeAheadWrapper>
            {
              <TypeAhead
                items={fields}
                placeholder="Search career fields here..."
                tagType="field"
              />
            }
          </TypeAheadWrapper>
        </Section>

        <DividerLine />

        <Section>
          <Boldparagraph>Skills</Boldparagraph>
          <Paragraph>
            Add tags to your profile to showcase your skills in different areas.
            The more detailed you are, the more likely you are to find relevant
            connections and posts on the site.
          </Paragraph>
          <TypeAheadWrapper>
            {
              <TypeAhead
                items={skills}
                placeholder="Search skills here..."
                tagType="skill"
              />
            }
          </TypeAheadWrapper>
        </Section>

        <Buttons>
          <Link to="/onboarding1">
            <Button className="secondary-button">Back</Button>
          </Link>
          <Link to="/profile">
            <Button className="primary-button" onClick={handleFinish}>
              Finish
            </Button>
          </Link>
        </Buttons>
        <HorizontalLine />
      </Form>
    </Container>
  );
};

export default Onboarding2;

//Styling
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const TypeAheadWrapper = styled.div`
  padding: 0 0 30px 0;
`;
const DividerLine = styled.hr`
  border: 1px solid #dbdbdb;
  margin-bottom: 30px;
`;
