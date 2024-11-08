import React from "react";
import "../Tag.css";
import closeIcon from "../MediaFiles/closeicon.svg";

const Tag = ({ word, tagType, removeable, removeTag }) => {
  const tagStyle = tagType === "field" ? "fieldTag" : "skillTag";

  const handleRemove = () => {
    event.preventDefault(); // Prevent default button behavior
    removeTag();
  };

  return (
    <div>
      <button className={tagStyle} onClick={(event) => handleRemove(event)}>
        <p>{word}</p>
        {/* <p>
          {word} <img src={closeIcon} alt="Close" style={styles.closingicon} />
        </p> */}
      </button>
    </div>
  );
};

// Styling the closingicon
// const styles = {
//   closingicon: {
//     width: "12px",
//     height: "12px",
//     cursor: "pointer",
//     position: "relative",
//     marginLeft: "8px",
//   },
// };

export default Tag;
