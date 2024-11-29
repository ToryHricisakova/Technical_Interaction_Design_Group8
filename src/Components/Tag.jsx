import React from "react";
import "../Components/Tag.css";

const Tag = ({ word, tagType, closable = true, removeTag }) => {
  const tagStyle = tagType === "field" ? "fieldTag" : "skillTag";

  const handleRemove = (event) => {
    event.preventDefault();
    // Prevent reloading the page on click. We do this because otherwise
    // if we have more than one tag and we click on one of them the page reloads and both tags are deleted.
    removeTag();
  };

  return (
    <div>
      <div className={tagStyle}>
        <p>
          {word}
          {closable && (
            <button className="closingTag" onClick={handleRemove}>
              x
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default Tag;
