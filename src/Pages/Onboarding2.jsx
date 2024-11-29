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
} from "../OnboardingCSS";
import { fetchFields, fetchSkills } from "../DataforTypeAhead";
import { useNavigate } from "react-router-dom";
import Parse from "parse";

// Mark the user as logged in (this has to be reflected in App.jsx!)
const Onboarding2 = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  // adding functionality for back4app

  const [fields, setFields] = useState([]); //setting the fields array
  const [skills, setSkills] = useState([]); //setting the skills array
  const [selectedFields, setSelectedFields] = useState([]); //array that will store the selected fields by the user
  const [selectedSkills, setSelectedSkills] = useState([]); //array that will store the selected skills by the user

  useEffect(() => {
    const loadFieldsAndSkills = async () => {
      //asynchronously fetches data for fields and skills from fetchFields() and fetchSkills()
      const fieldsData = await fetchFields();
      const skillsData = await fetchSkills();
      setFields(fieldsData); //once data is fetched, fields array is updated with selected values
      setSkills(skillsData);
    };

    loadFieldsAndSkills();
  }, []);

  async function handleSavingAdditionalInfo() {
    //saves the selected fields and skills into USERS
    const currentUser = Parse.User.current(); //fetches current user

    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }

    const USERS = Parse.Object.extend("USERS");
    const query = new Parse.Query(USERS);
    query.equalTo("user", currentUser);

    try {
      const userRow = await query.first();
      // console.log("Queried user row:", userRow);

      if (!userRow) {
        //if the row exists, it is populated with the selected field(s) and skill(s)
        console.error("No USERS entry found for the current user.");
        return;
      }

      userRow.set("fields", selectedFields);
      userRow.set("skills", selectedSkills);

      // console.log("Selected Fields:", selectedFields);
      // console.log("Selected Skills:", selectedSkills);

      await userRow.save(); //saving the updated skills and fields and navigates to the profile
      // console.log("USERS entry updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating USERS entry:", error.message);
    }
  }

  const handleFinish = () => {
    //marks the user as logged in, saves the selected fields and skills to USERS (upon clicking Finish)
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
            combination of areas of expertise.
          </Paragraph>
          <TypeAheadWrapper>
            {
              <TypeAhead
                items={fields} //should be from the dynamically fetched data
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
                items={skills} //should be from dynamically fetched data
                placeholder="Search skills here..."
                tagType="skill"
                //onSelectionChange={(selected) => setSelectedSkills(selected)}
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
              className="secondary-button"
              onClick={() => navigate("/onboarding1")}
            >
              Back
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              className="primary-button"
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
