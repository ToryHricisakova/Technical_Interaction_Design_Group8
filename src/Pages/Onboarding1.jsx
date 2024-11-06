import React, { useState } from "react";
import HorizontalLine from "../Components/HorizontalLine";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../Components/PrimaryButton";
import SecondaryButton from "../Components/SecondaryButton";
import { Link } from "react-router-dom";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const Onboarding1 = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Customize Profile - Basic Info</h1>
      <HorizontalLine />
      <div style={styles.paragraph}>
        Personalize your profile by uploading a profile picture and adding some
        basic information about yourself.
      </div>

      <div className="DoB">
        <div style={styles.boldparagraph}>Date of birth:</div>
        <div>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
      </div>
      <div className="pronouns" style={styles.pronouns}>
        <div style={styles.boldparagraph}>Pronouns:</div>
        <div style={styles.radiobuttonGrouping}>
          <div style={styles.radiobutton}>
            <input
              className="radioButton"
              type="radio"
              name="pronouns"
              id="hehim"
            />
            <label className="checkboxLabel" style={styles.checkboxLabel} htmlFor="hehim">
              He/Him
            </label>
          </div>
          <div style={styles.radiobutton}>
            <input
              className="radioButton"
              type="radio"
              name="pronouns"
              id="sheher"
            />
            <label className="checkboxLabel" style={styles.checkboxLabel} htmlFor="sheher">
              She/Her
            </label>
          </div>
          <div style={styles.radiobutton}>
            <input
              className="radioButton"
              type="radio"
              name="pronouns"
              id="theythem"
            />
            <label className="checkboxLabel" style={styles.checkboxLabel} htmlFor="theythem">
              They/Them
            </label>
          </div>
          <div style={styles.radiobutton}>
            <input
              className="radioButton"
              type="radio"
              name="pronouns"
              id="otherpro"
            />
            <label className="checkboxLabel" htmlFor="otherpro">
              Other
            </label>
          </div>
        </div>
      </div>

      <div className="ProfilePicture">
        <div style={styles.boldparagraph}>Profile picture:</div>
        <SecondaryButton>Upload Picture</SecondaryButton>
      </div>

      <div className="profileBio">
        <div style={styles.boldparagraph}>Profile bio:</div>
        <textarea style={styles.biotext} id="bioinfo" rows="5" cols="33">
          Write your bio here...
        </textarea>
      </div>
      <Link to="/onboarding2" style={styles.nextButton}>
        <PrimaryButton>Next</PrimaryButton>
      </Link>
      <HorizontalLine />
    </div>
  );
};

export default Onboarding1;

//Styling
const styles = {
  container: {
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: "20px",
    padding: "30px",
    width: "500px",
    position: "absolute",
    bottom: "75px",
    left: "75px",
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
    backgroundColor: "white",
    width: "70%",
    color: "black",
    marginBottom: "1rem",
  },

  pronouns: {
    margin: "5px 2",
  },

  radiobutton: {
    display: "flex",
    alignItems: "center",
    gap: "0rem",
  },
  
  radiobuttonGrouping: {
    display: "flex",
    gap: "1rem",
    justifyContent: "left",
  },

  checkboxLabel: {
    flexShrink: "0", // Prevents the labels from splitting into two lines.
  },

  nextButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
};
