import React from "react";
import HorizontalLine from "../Components/HorizontalLine";
import PrimaryButton from "../Components/PrimaryButton";
import SecondaryButton from "../Components/SecondaryButton";
import TypeAhead from "../Components/TypeAhead";
import Tag from "../Components/Tag";
import skills from "../MediaFiles/skills";
import { Link } from "react-router-dom";

const Onboarding3 = () => {
  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <h1 style={styles.mainTitle}>Customize Profile - Skills</h1>
        <HorizontalLine />
        <div style={styles.paragraph}>
          Add tags to your profile to showcase your skills in different areas. The
          more detailed you are, the more likely you are to find relevant
          connections and posts on the site.
        </div>
        <div className="Skills">
          <div style={styles.boldparagraph}>Skills:</div>
          {
            <TypeAhead
              items={skills}
              placeholder="Search skills here..."
              tagType="skill"
            />
          }
        </div>
        <div className="addedSkills">
          <div style={styles.boldparagraph}>Added skills:</div>
        </div>
        <div style={styles.buttons}>
          <Link to="/onboarding2" style={styles.backButton}>
            <SecondaryButton>Back</SecondaryButton>
          </Link>

          <Link to="/landingpage" style={styles.nextButton}>
            <PrimaryButton>Finish</PrimaryButton>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Onboarding3;

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
    padding: "30px",
    width: "500px",
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
    width: "300px",
    color: "black",
    fontFamily: "Inter, sans-serif",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  }
};
