import { useState, useEffect } from "react";
import HorizontalLine from "../Components/HorizontalLine";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Components/Button";
import TypeAhead from "../Components/TypeAhead";
//import fields from "../../public/MediaFiles/fields";
import { Link } from "react-router-dom";
//import skills from "../../public/MediaFiles/skills";
import styled from "styled-components";
import {
  Container,
  Form,
  MainTitle,
  Paragraph,
  Boldparagraph,
  Section,
} from "../OnboardingCSS";
import { fetchFields, fetchSkills } from "../DataforTypeAhead";

const Onboarding2 = ({ setIsLoggedIn }) => {
  // adding functionality for back4app
  const [fields, setFields] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadFieldsAndSkills = async () => {
      const fieldsData = await fetchFields();
      const skillsData = await fetchSkills();
      setFields(fieldsData);
      setSkills(skillsData);
    };

    loadFieldsAndSkills();
  }, []);

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
                items={fields} //should be from the dynamically fetched data
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
                items={skills} //should be from dynamically fetched data
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
  margin-bottom: 15px;
`;
const TypeAheadWrapper = styled.div`
  padding: 0 0 30px 0;
`;
const DividerLine = styled.hr`
  border: 1px solid #dbdbdb;
  margin-bottom: 30px;
`;
