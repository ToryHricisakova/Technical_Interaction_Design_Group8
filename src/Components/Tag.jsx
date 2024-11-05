import React from "react";
import "../Tag.css";

const Tag = ({ word, tagType, removeable }) => {

  const handleRemove = () => {
   
  };

  const tagStyle = tagType === "field" ? "fieldTag" : "skillTag";

  return (
    <span className={tagStyle}>
    <p>{word}</p>
    {/* {removeable && (
      <button className="removeTag" onClick={handleRemove}>
        
      </button>
    )} */}
    </span>
  );
};

export default Tag;
