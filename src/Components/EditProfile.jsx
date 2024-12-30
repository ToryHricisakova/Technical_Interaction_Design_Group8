import { useState, useEffect } from "react";
import HorizontalLine from "./HorizontalLine.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button.jsx";
import TypeAhead from "../Components/TypeAhead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  MainTitle,
  Paragraph,
  Boldparagraph,
  Section,
} from "../Components/OnboardingCSS";
import Parse from "parse";
import { fetchFields, fetchSkills } from "../DataforTypeAhead";
import useUserProfile from "../Hooks/useUserProfile";

const EditProfile = ({ onClose }) => {

  const [user, loading] = useUserProfile();
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [pronouns, setPronouns] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [fields, setFields] = useState([]); //setting the total fields array
  const [skills, setSkills] = useState([]); //setting the total skills array
  const [selectedFields, setSelectedFields] = useState([]); //array that will store the selected fields by the user
  const [selectedSkills, setSelectedSkills] = useState([]); //array that will store the selected skills by the user

  // Uses a custom hook to get the current user data
  useEffect(() => {
    if (user) {
      const dob = user.get("dateOfBirth");
      setDateOfBirth(dob ? new Date(dob) : null);
      setPronouns(user.get("gender") || "");
      setProfileBio(user.get("profileBio") || "");
      setSelectedFields(user.get("fields") || []);
      setSelectedSkills(user.get("skills") || []);
    }
  }, [user, loading]);

  // Fetches total fields and skills data for selection 
  useEffect(() => {
    const loadFieldsAndSkills = async () => {
      //asynchronously fetches data for fields and skills from fetchFields() and fetchSkills()
      const fieldsData = await fetchFields();
      const skillsData = await fetchSkills();
      setFields(fieldsData); //once data is fetched, fields and skills array is updated with selected values
      setSkills(skillsData);
    };
    loadFieldsAndSkills();
  }, []);

  // Query that updates the new user infromation
  const handleSavingProfileInfo = async () => {
    if (!user) {
      console.error("No user profile to update.");
      return;
    }

    try {
      const USERS = Parse.Object.extend("USERS");
      const query = new Parse.Query(USERS);
      query.equalTo("user", user);

      user.set("dateOfBirth", dateOfBirth);
      user.set("gender", pronouns);
      user.set("profileBio", profileBio);
      user.set("fields", selectedFields);
      user.set("skills", selectedSkills);
      await user.save();

      console.log("USER infromation updated successfully!");
      onClose(); // Closing the modal pop-up after saving
      location.reload();
    } catch (error) {
      console.error("Error updating USER information:", error.message);
    }
  };

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
              openToDate={dateOfBirth}
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
      </Section>

      <MainTitle>Edit Profile - Career Fields</MainTitle>
      <HorizontalLine />
      <Section>
        <Boldparagraph>Field of work/study</Boldparagraph>
        <Paragraph>
          Add the professional fields that you are working or studying in. The
          fields you add will help others to find you based on your combination
          of areas of expertise. You can add a maximum of three fields.
        </Paragraph>
        {fields && fields.length > 0 && (
          <TypeAheadWrapper>
            <TypeAhead
              items={fields}
              placeholder="Search career fields here..."
              tagType="field"
              maxNumber={3}
              value={selectedFields}
              onSelectionChange={(updatedFields) => {
                setSelectedFields(updatedFields);
              }}
            />
          </TypeAheadWrapper>
        )}
      </Section>

      <DividerLine />

      <Section>
        <Boldparagraph>Skills</Boldparagraph>
        <Paragraph>
          Add tags to your profile to showcase your skills in different areas.
          The more detailed you are, the more likely you are to find relevant
          connections and posts on the site.
        </Paragraph>
        {skills && skills.length > 0 && (
          <TypeAheadWrapper>
            {
              <TypeAhead
                items={skills} //should be from dynamically fetched data
                placeholder="Search skills here..."
                tagType="skill"
                value={selectedSkills}
                onSelectionChange={(updatedSkills) =>
                  setSelectedSkills(updatedSkills)
                }
              />
            }
          </TypeAheadWrapper>
        )}
      </Section>

      <Button
        className="primary-button"
        type="button"
        onClick={handleSavingProfileInfo}
      >
        Save
      </Button>
    </>
  );
};

export default EditProfile;

// Styling

const TypeAheadWrapper = styled.div`
  padding: 0 0 30px 0;
`;
const DividerLine = styled.hr`
  border: 1px solid #dbdbdb;
  margin-bottom: 30px;
`;
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
const CalendarIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  color: #424242;
`;
