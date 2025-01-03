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
} from "../Components/OnboardingCSS";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

const Onboarding1 = () => {
  const navigate = useNavigate();

  /**
   * Saves user information to the USERS table, using Parse queries to fetch and
   * update the current user's record.
   *
   * After saving the data, it navigates to onboarding2.
   */
  async function handleSavingAdditionalInfo() {
    const currentUser = Parse.User.current();

    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }

    const USERS = Parse.Object.extend("USERS");
    const query = new Parse.Query(USERS);
    query.equalTo("user", currentUser);

    try {
      const userRow = await query.first();
      if (!userRow) {
        console.error("No USERS entry found for the current user.");
        return;
      }

      /**
       * These states store the personal information chosen by the user.
       */
      userRow.set("dateOfBirth", dateOfBirth);
      userRow.set("gender", pronouns);
      userRow.set("profileBio", profileBio);
      if (profileImage !== null) userRow.set("profileImage", profileImage);
      await userRow.save();
      console.log("USERS entry updated successfully!");

      navigate("/onboarding2");
    } catch (error) {
      console.error("Error updating USERS entry:", error.message);
    }
  }

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [pronouns, setPronouns] = useState("");
  const [profileBio, setProfileBio] = useState("");

  /**
   * fileRef is a reference to the hidden input (HiddenInput), which is
   * an element that allows the user to upload a file but is styled to be invisible.
   */
  const fileRef = useRef(null);

  /**
   * startDate sets a minimum age requirement to 18 years.
   */
  const tempDate = new Date();
  const startDate = tempDate.setFullYear(tempDate.getFullYear() - 18); // Open calendar at 18 years ago.

  /**
   * Handles profile picture uploads by reading the selected file and
   * updating the profilePhoto state with the file's URL.
   */
  const getProfilePhoto = async (event) => {
    const image = event.target.files[0];
    try {
      const profilePhoto = new Parse.File(image.name, image);
      await profilePhoto.save();
      setProfileImage(profilePhoto);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * When the user clicks the upload picture button, handleClick is triggered.
   *
   * fileRef.current.click() simulates a click on the hidden file input, which opens the picker dialog for
   * the user to choose an image.
   */
  function handleClick(e) {
    e.preventDefault();
    fileRef.current.click();
  }

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
              <DatePicker
                showYearDropdown
                selected={dateOfBirth}
                openToDate={startDate}
                onChange={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
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
              <ProfileImage
                src={
                  profileImage
                    ? profileImage.url()
                    : "src/MediaFiles/DefaultProfile.svg"
                }
                alt="Profile Picture"
              />
              <HiddenInput
                type="file"
                onChange={getProfilePhoto}
                ref={fileRef}
              />
            </UploadWrapper>
            <Button variant="secondary-button" onClick={handleClick}>
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
              onChange={(e) => setProfileBio(e.target.value)}
            />
          </InfoBlock>

          <NextButton to="/onboarding2">
            <Button
              variant="primary-button"
              type="button"
              onClick={handleSavingAdditionalInfo}
            >
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
export const InfoBlock = styled.div`
  padding-bottom: 15px;
  border-radius: 20px;
  width: 550px;
`;
export const RadioButton = styled.div`
  display: flex;
  align-items: center;
`;
export const BioText = styled.textarea`
  background-color: white;
  padding: 15px;
  width: 100%;
  resize: none;
  color: black;
  margin-bottom: 15px;
  box-sizing: border-box; // Prevents box from expanding when extra padding is added.
  font-family: Inter;
`;
export const CalenderContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
export const RadiobuttonGrouping = styled.div`
  display: flex;
  gap: 15px;
  justify-content: left;
  height: 15px;
`;
export const CheckboxLabel = styled.label`
  white-space: nowrap;
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.5;
  color: #333;
`;
export const NextButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  text-decoration: none;
`;
export const CalendarIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  color: #424242;
`;
export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px hidden;
`;
export const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 15px;
`;
export const HiddenInput = styled.input`
  display: none;
`;
