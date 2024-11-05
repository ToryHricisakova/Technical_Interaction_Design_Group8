import React, { useState } from "react";
import HorizontalLine from "../Components/HorizontalLine";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../Components/PrimaryButton";
import SecondaryButton from "../Components/SecondaryButton";
import TypeAhead from "../Components/TypeAhead";
import Tag from "../Components/Tag";

const Onboarding2 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Customize Profile - Career Fields</h1>
      <HorizontalLine />
      <div style={styles.paragraph}>
        Add the professional fields that you are working or studying in. The
        fields you add will help others to find you based on your combination of
        areas of expertise.
      </div>
      <div className="Fields">
        <div style={styles.boldparagraph}>Field of work/study:</div>
        <TypeAhead
          items={fields}
          placeholder="Search career fields here..."
          tagType="field"
        />
      </div>
      <div className="addedFields">
        <div style={styles.boldparagraph}>Added fields:</div>
      </div>

      <PrimaryButton>Next</PrimaryButton>
      <HorizontalLine />
    </div>
  );
};

export default Onboarding2;

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
    width: "300px",
    color: "black",
    fontFamily: "Inter, sans-serif",
  },
};
