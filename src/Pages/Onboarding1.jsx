import { useState, useRef, useEffect } from "react";
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
} from "../OnboardingCSS.jsx";

const Onboarding1 = () => {
  const [date, setDate] = useState(null);
  const [file, setFile] = useState("src/MediaFiles/Profile2.svg");
  const [pronouns, setPronouns] = useState("");

  const fileRef = useRef(null);

  const tempDate = new Date();
  const startDate = tempDate.setFullYear(tempDate.getFullYear() - 18); // Open calendar at 18 years ago.

  function getFile(event) {
    setFile(URL.createObjectURL(event.target.files[0]));
  }

  function handleClick(e) {
    e.preventDefault();
    fileRef.current.click();
  }

  function handleSubmit() {
    return; // needs to be implemented with backend.
  }

  // useEffects for debugging:

  useEffect(() => {
    console.log("Date of birth set to " + date);
  }, [date]);

  useEffect(() => {
    console.log("pronouns set to " + pronouns);
  }, [pronouns]);

  useEffect(() => {
    console.log("Profile picture URL is " + file);
  }, [file]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
              <DatePicker
                showYearDropdown
                selected={date}
                openToDate={startDate}
                onChange={(date) => setDate(date)}
                placeholderText="Click to select a date"
              />
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
                  value="He/Him"
                  onChange={(e) => setPronouns(e.target.value)}
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
                  value="She/Her"
                  onChange={(e) => setPronouns(e.target.value)}
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
                  value="They/Them"
                  onChange={(e) => setPronouns(e.target.value)}
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
                  value="Other"
                  onChange={(e) => setPronouns(e.target.value)}
                />
                <CheckboxLabel className="checkboxLabel" htmlFor="otherpro">
                  Other
                </CheckboxLabel>
              </RadioButton>
            </RadiobuttonGrouping>
          </InfoBlock>

          <InfoBlock className="ProfilePicture">
            <Boldparagraph>Profile Picture:</Boldparagraph>
            <UploadWrapper>
              <ProfileImage src={file} alt="Profile Picture" />
              <HiddenInput type="file" onChange={getFile} ref={fileRef} />
            </UploadWrapper>
            <Button className="secondary-button" onClick={handleClick}>
              Upload Picture
            </Button>
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
            <Button className="primary-button" type="submit">
              Next
            </Button>
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
`;
const BioText = styled.textarea`
  background-color: white;
  padding: 15px;
  width: 100%;
  resize: none;
  color: black;
  margin-bottom: 15px;
  box-sizing: border-box; // Prevents box from expanding when extra padding is added.
`;
const CalenderContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const RadiobuttonGrouping = styled.div`
  display: flex;
  gap: 15px;
  justify-content: left;
  height: 15px;
`;
const CheckboxLabel = styled.label`
  white-space: nowrap;
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.5;
  color: #333;
`;
const NextButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  text-decoration: none;
`;
const CalendarIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  color: #424242;
`;
const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px hidden;
`;
const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 15px;
`;
const HiddenInput = styled.input`
  display: none;
`;
