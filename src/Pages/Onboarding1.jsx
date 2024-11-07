import React, { useState } from "react";
import HorizontalLine from "../Components/HorizontalLine";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../Components/PrimaryButton";
import SecondaryButton from "../Components/SecondaryButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Onboarding1 = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <h1 style={styles.mainTitle}>Customize Profile - Basic Info</h1>
        <HorizontalLine />
        <div style={styles.paragraph}>
          Personalize your profile by uploading a profile picture and adding some
          basic information about yourself.
        </div>
        <div style={styles.infoGrid}>
          <div className="DoB" style={styles.infoBlock}>
            <div style={styles.boldparagraph}>Date of birth:</div>
            <div style={styles.calenderContainer}>
              <div>
                <DatePicker selected={date} onChange={(date) => setDate(date)} />
              </div>
              <FontAwesomeIcon
                icon={faCalendarAlt} style={styles.calenderIcon}
              />
            </div>
          </div>
          <div className="pronouns" style={styles.infoBlock}>
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
          
        

          <div className="ProfilePicture" style={styles.infoBlock}>
            <div style={styles.boldparagraph}>Profile picture:</div>
            <SecondaryButton>Upload Picture</SecondaryButton>
          </div>

          <div className="profileBio" style={styles.infoBlock}>
            <div style={styles.boldparagraph}>Profile bio:</div>
            <textarea style={styles.biotext} id="bioinfo" rows="5" cols="33" placeholder="Write your bio here..."/>
          </div>
        </div>
        <Link to="/onboarding2" style={styles.nextButton}>
          <PrimaryButton>Next</PrimaryButton>
        </Link>
        <HorizontalLine />
        </form>
      </div>
  );
};

export default Onboarding1;

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
    width: "600px",
    position: "relative",
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
  radiobutton: {
    display: "flex",
    alignItems: "center",
    gap: "0rem",
  },
  radiobuttonGrouping: {
    display: "flex",
    gap: "1rem",
    justifyContent: "left",
    height: "15px",
  },
  checkboxLabel: {
    flexShrink: "0", // Prevents the labels from splitting into two lines.
  },
  nextButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem"
  },
  infoBlock: {
    paddingBottom: "15px",
  },
  // infoGrid: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  //   gap: "20px",
  // }
  calenderContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  calenderIcon: {
    transform: "translateY(-8%)",
    marginLeft: "5px",
    color: "#424242",
  },
};
