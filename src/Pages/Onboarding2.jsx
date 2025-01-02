import { useState, useEffect } from "react";
import HorizontalLine from "../Components/HorizontalLine";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Components/Button";
import TypeAhead from "../Components/TypeAhead";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  Form,
  MainTitle,
  Paragraph,
  Boldparagraph,
  Section,
} from "../Components/OnboardingCSS";
import { fetchFields, fetchSkills } from "../Components/DataforTypeAhead.jsx";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

/**
 *
 * fields and skills: arrays to store dynamically fetched career fields and skills data
 *
 * selectedFields and selectedSkills: arrays to store user-selected fields and skills
 *
 */
const Onboarding2 = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [fields, setFields] = useState([]); //setting the fields array
  const [skills, setSkills] = useState([]); //setting the skills array
  const [selectedFields, setSelectedFields] = useState([]); //array that will store the selected fields by the user
  const [selectedSkills, setSelectedSkills] = useState([]); //array that will store the selected skills by the user

  /**
   * The useEffect hook runs the loadFieldsAndSkills function once the component mounts.
   * fetchFields and fetchSkills are called to retrieve data from Back4App.
   * setFields and setSkills update the respective arrays
   */
  useEffect(() => {
    const loadFieldsAndSkills = async () => {
      /**
       * Asynchronously fetches data for fields and skills from fetchFields() and fetchSkills()
       * Once data is fetched, fields array is updated with selected values (through setFields(fieldsData), same for skills)
       */
      const fieldsData = await fetchFields();
      const skillsData = await fetchSkills();
      setFields(fieldsData);
      setSkills(skillsData);
    };

    loadFieldsAndSkills();
  }, []);

  /**
   *
   * Retrieves the current user from Parse. Checks if the user is logged in and fetches
   * their database entry from USERS if they are.
   *
   * Saves the selected fields and skills into USERS
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

      /**
       * If the row exists, it is populated with the selected field(s) and skill(s)
       */
      if (!userRow) {
        console.error("No USERS entry found for the current user.");
        return;
      }

      /**
       * The user's fields and skils columns are updated with the selected values here.
       */
      userRow.set("fields", selectedFields);
      userRow.set("skills", selectedSkills);

      /**
       * Saving the updated skills and fields and navigating to the profile
       */
      await userRow.save();
      navigate("/profile");
    } catch (error) {
      console.error("Error updating USERS entry:", error.message);
    }
  }

  /**
   * Marks the user as logged in, saves the selected fields and skills to
   * USERS (upon clicking Finish, by calling the handleSavingAdditionalInfo() function.)
   *
   */
  const handleFinish = () => {
    setIsLoggedIn(true);
    handleSavingAdditionalInfo();
  };

  useEffect(() => {
    console.log("Updated selected fields:", selectedFields); // Debugging
  }, [selectedFields]); // This will run whenever selectedFields changes

  useEffect(() => {
    console.log("Updated selected skills:", selectedSkills); // Debugging
  }, [selectedSkills]);

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
            combination of areas of expertise. You can add a maximum of three
            fields.
          </Paragraph>
          <TypeAheadWrapper>
            {
              <TypeAhead
                items={fields}
                placeholder="Search career fields here..."
                tagType="field"
                maxNumber={3}
                onSelectionChange={(updatedFields) => {
                  setSelectedFields(updatedFields);
                }}
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
                onSelectionChange={(updatedSkills) =>
                  setSelectedSkills(updatedSkills)
                }
              />
            }
          </TypeAheadWrapper>
        </Section>

        <Buttons>
          <Link to="/onboarding1">
            <Button
              variant="secondary-button"
              onClick={() => navigate("/onboarding1")}
            >
              Back
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              variant="primary-button"
              onClick={() => {
                handleFinish();
              }}
            >
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
export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;
export const TypeAheadWrapper = styled.div`
  padding: 0 0 30px 0;
`;
export const DividerLine = styled.hr`
  border: 1px solid #dbdbdb;
  margin-bottom: 30px;
`;
