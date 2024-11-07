import React from "react";
import "../Tag.css";

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
      </button>
    </div>
  );
};

export default Tag;
