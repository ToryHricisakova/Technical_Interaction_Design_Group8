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
  MainTitle,
  Paragraph,
  Boldparagraph,
  Section,
} from "../OnboardingCSS.jsx";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

const EditProfile1 = () => {
  const navigate = useNavigate();

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [pronouns, setPronouns] = useState("");
  const [profileBio, setProfileBio] = useState("");

  useEffect(() => {
    const loadUserInfo = async () => {
      const currentUser = Parse.User.current();
      if (!currentUser) {
        console.error("No user is logged in.");
        return;
      }

      try {
        const USERS = Parse.Object.extend("USERS");
        const query = new Parse.Query(USERS);
        query.equalTo("user", currentUser);

        const userRow = await query.first();
        if (userRow) {
          // Safely parse data
          const dob = userRow.get("dateOfBirth");
          setDateOfBirth(dob ? new Date(dob) : null);
          setPronouns(userRow.get("gender") || "");
          setProfileBio(userRow.get("profileBio") || "");
        } else {
          console.warn("No USERS entry found for the current user.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error.message);
      }
    };

    loadUserInfo();
  }, []);

  const handleSavingAdditionalInfo = async () => {
    const currentUser = Parse.User.current();

    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }

    try {
      const USERS = Parse.Object.extend("USERS");
      const query = new Parse.Query(USERS);
      query.equalTo("user", currentUser);

      const userRow = await query.first();
      if (!userRow) {
        console.error("No USERS entry found for the current user.");
        return;
      }

      userRow.set("dateOfBirth", dateOfBirth);
      userRow.set("gender", pronouns);
      userRow.set("profileBio", profileBio);
      await userRow.save();

      console.log("USERS entry updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error updating USERS entry:", error.message);
    }
  };

  const tempDate = new Date();
  const startDate = tempDate.setFullYear(tempDate.getFullYear() - 18);

  return (
    <>
      <MainTitle>Edit Profile - Basic Info</MainTitle>
      <HorizontalLine />
      <Section>
        <Paragraph>
          Update your profile here. After you are done with the changes, press
          save. Otherwise, your new information will be discarded.
        </Paragraph>
        <InfoBlock className="DoB">
          <Boldparagraph>Date of birth:</Boldparagraph>
          <CalenderContainer>
            <DatePicker
              showYearDropdown
              selected={dateOfBirth}
              openToDate={startDate}
              onChange={(date) => setDateOfBirth(date)}
              placeholderText="Click to select a date"
            />
            <CalendarIcon icon={faCalendarAlt} />
          </CalenderContainer>
        </InfoBlock>

        <InfoBlock className="pronouns">
          <Boldparagraph>Pronouns:</Boldparagraph>
          <RadiobuttonGrouping>
            {["He/Him", "She/Her", "They/Them", "Other"].map((option) => (
              <RadioButton key={option}>
                <input
                  className="radioButton"
                  type="radio"
                  name="pronouns"
                  value={option}
                  checked={pronouns === option}
                  onChange={(e) => setPronouns(e.target.value)}
                />
                <CheckboxLabel className="checkboxLabel" htmlFor={option}>
                  {option}
                </CheckboxLabel>
              </RadioButton>
            ))}
          </RadiobuttonGrouping>
        </InfoBlock>

        <InfoBlock className="profileBio">
          <Boldparagraph>Profile bio:</Boldparagraph>
          <BioText
            id="bioinfo"
            rows="5"
            cols="33"
            placeholder="Write your bio here..."
            value={profileBio}
            onChange={(e) => setProfileBio(e.target.value)}
          />
        </InfoBlock>

        <NextButton>
          <Button
            className="primary-button"
            type="button"
            onClick={handleSavingAdditionalInfo}
          >
            Save
          </Button>
        </NextButton>
      </Section>
      <HorizontalLine />
    </>
  );
};

export default EditProfile1;

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
  font-family: Inter;
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
