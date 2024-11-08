import React, { useState } from "react";
import HorizontalLine from "../Components/HorizontalLine";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../Components/PrimaryButton";
import SecondaryButton from "../Components/SecondaryButton";
import TypeAhead from "../Components/TypeAhead";
import Tag from "../Components/Tag";
import fields from "../MediaFiles/fields";
import { Link } from "react-router-dom";
import skills from "../MediaFiles/skills";

const Onboarding2 = ({ setIsLoggedIn }) => {

  const handleFinish = () => {
    setIsLoggedIn(true); 
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} >
        <h1 style={styles.mainTitle}>Customize Profile - Career Fields</h1>
        <HorizontalLine />
        <div style={styles.section}>
          <div style={styles.boldparagraph}>Field of work/study</div>
          <div style={styles.paragraph}>
            Add the professional fields that you are working or studying in. The
            fields you add will help others to find you based on your combination of
            areas of expertise.
          </div>
          <div className="Fields" style={styles.typeAhead}>
            {
              <TypeAhead
                items={fields}
                placeholder="Search career fields here..."
                tagType="field"
              />
            }
          </div>
          {/* <div className="addedFields">
            <div style={styles.boldparagraph}>Added fields:</div>
          </div> */}
        </div>
        <hr style={styles.dividerLine}/>
        <div style={styles.section}>
          <div style={styles.boldparagraph}>Skills</div>
          <div style={styles.paragraph}>  
            Add tags to your profile to showcase your skills in different areas. The
            more detailed you are, the more likely you are to find relevant
            connections and posts on the site.
          </div>
          <div className="Skills" style={styles.typeAhead}>
            {
              <TypeAhead
                items={skills}
                placeholder="Search skills here..."
                tagType="skill"
              />
            }
          </div>
          {/* <div className="addedSkills">
            <div style={styles.boldparagraph}>Added skills:</div>
          </div> */}
        </div>

        <div style={styles.buttons}>
          <Link to="/onboarding1">
            <SecondaryButton>Back</SecondaryButton>
          </Link>
          <Link to="/profile">
            <PrimaryButton onClick={handleFinish} >Finish</PrimaryButton>
          </Link>
          {/*<PrimaryButton onClick={handleFinish} style={styles.nextButton}>
            Finish
          </PrimaryButton>*/}
        </div>
        <HorizontalLine />
      </form>
    </div>
  );
};

export default Onboarding2;

//Styling
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: "100vh",
    height: '100vh',
    width: '100vw',
    position: 'relative',
  },
  form: {
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: "20px",
    padding: "45px",
    width: "550px",
    position: "absolute",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  mainTitle: {
    fontSize: "2em",
    margin: "0 0 10px 0",
    color: "#35415D",
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: "1em",
    margin: "10px 0",
    lineHeight: "1.5",
    color: "#333",
  },
  boldparagraph: {
    fontSize: "1em",
    margin: "10px 0",
    lineHeight: "1.5",
    color: "#333",
    fontWeight: "bold",
  },
  biotext: {
    width: "100%",
    color: "black",
    fontFamily: "Inter, sans-serif",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  typeAhead: {
    padding: "0 0 30px 0",
  },
  dividerLine: {
    border: "1px solid #dbdbdb",
    marginBottom: "30px",
  },
  section: {
    margin: "20px 0 10px 0",
  },
};
