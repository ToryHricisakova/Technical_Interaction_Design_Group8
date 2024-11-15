import React, { useState } from "react";
import HorizontalLine from "../Components/HorizontalLine";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  Container,
  Form,
  MainTitle,
  Paragraph,
  Boldparagraph,
  Section,
} from "../onboardingCSS.jsx";

const Onboarding1 = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Container>
      <Form>
        <MainTitle>Customize Profile - Basic Info</MainTitle>
        <HorizontalLine />
        <Section>
          <Paragraph>
            Personalize your profile by uploading a profile picture and adding
            some basic information about yourself.
          </Paragraph>
          <InfoBlock className="DoB">
            <Boldparagraph>Date of birth:</Boldparagraph>
            <CalenderContainer>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
              <CalendarIcon icon={faCalendarAlt} />
            </CalenderContainer>
          </InfoBlock>

          <InfoBlock className="pronouns">
            <Boldparagraph>Pronouns:</Boldparagraph>
            <RadiobuttonGrouping>
              <RadioButton>
                <input
                  className="radioButton"
                  type="radio"
                  name="pronouns"
                  id="hehim"
                />
                <CheckboxLabel className="checkboxLabel" htmlFor="hehim">
                  He/Him
                </CheckboxLabel>
              </RadioButton>
              <RadioButton>
                <input
                  className="radioButton"
                  type="radio"
                  name="pronouns"
                  id="sheher"
                />
                <CheckboxLabel className="checkboxLabel" htmlFor="sheher">
                  She/Her
                </CheckboxLabel>
              </RadioButton>
              <RadioButton>
                <input
                  className="radioButton"
                  type="radio"
                  name="pronouns"
                  id="theythem"
                />
                <CheckboxLabel className="checkboxLabel" htmlFor="theythem">
                  They/Them
                </CheckboxLabel>
              </RadioButton>
              <RadioButton>
                <input
                  className="radioButton"
                  type="radio"
                  name="pronouns"
                  id="otherpro"
                />
                <CheckboxLabel className="checkboxLabel" htmlFor="otherpro">
                  Other
                </CheckboxLabel>
              </RadioButton>
            </RadiobuttonGrouping>
          </InfoBlock>

          <InfoBlock className="ProfilePicture">
            <Boldparagraph>Profile picture:</Boldparagraph>
            <Button className="secondary-button">Upload Picture</Button>
          </InfoBlock>

          <InfoBlock className="profileBio">
            <Boldparagraph>Profile bio:</Boldparagraph>
            <BioText
              id="bioinfo"
              rows="5"
              cols="33"
              placeholder="Write your bio here..."
            />
          </InfoBlock>

          <NextButton to="/onboarding2">
            <Button className="primary-button">Next</Button>
          </NextButton>
        </Section>
        <HorizontalLine />
      </Form>
    </Container>
  );
};

export default Onboarding1;

// Styling
const InfoBlock = styled.div`
  padding-bottom: 15px;
  border-radius: 20px;
  width: 550px;
`;
const RadioButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0rem;
`;
const BioText = styled.textarea`
  background-color: white;
  padding: 15px;
  width: 100%;
  resize: none;
  color: black;
  margin-bottom: 1rem;
  box-sizing: border-box; // Prevents box from expanding when extra padding is added.
`;
const CalenderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const RadiobuttonGrouping = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: left;
  height: 15px;
`;
const CheckboxLabel = styled.label`
  white-space: nowrap;
`;
const NextButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  text-decoration: none;
`;
const CalendarIcon = styled(FontAwesomeIcon)`
  transform: translateY(-8%);
  margin-left: 5px;
  color: #424242;
`;
