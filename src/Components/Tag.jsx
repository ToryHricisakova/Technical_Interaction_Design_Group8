import React from "react";
import "../Tag.css";
//import closeIcon from "../MediaFiles/closeicon.svg";

const Tag = ({ word, tagType, removeable, removeTag }) => {
  const tagStyle = tagType === "field" ? "fieldTag" : "skillTag";

  const handleRemove = () => {
    event.preventDefault(); 
    // Prevent reloading the page on click. We do this because otherwise if we have more than one tag and we click on one of them the page reloads and both tags are deleted. 
    removeTag();
  };

  return (
    <div>
      <button className={tagStyle} onClick={handleRemove}>
        <p>{word}</p>
        {/* <p>
          {word} <img src={closeIcon} alt="Close" style={styles.closingicon} />
        </p> trying to include the closing icon symbol to the tags to indicate that they can be deleted*/}
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
