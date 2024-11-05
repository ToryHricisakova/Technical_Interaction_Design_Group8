import React from "react";
import "../Tag.css";

const Tag = ({ word, category }) => {
  if (category === "field") {
    return (
      <span className="fieldTag">
        <p>{word}</p>
      </span>
    );
  }
  else if (category ==="skill")
    return (
      <span className="skillTag">
        <p>{word}</p>
      </span>
  );  
};

export default Tag;
