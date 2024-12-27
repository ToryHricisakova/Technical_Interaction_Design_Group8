import React from "react";
import "../Components/Tag.css";

/**
 * Reusable component for displaying the tags (fields, skills, countries).
 * It also gives the option for deleting the tag.
 *
 * word --> String representing the chosen field or skill
 *
 * tagType --> determines the type of the tag (skill or field)
 *
 * closable --> some tags can be removed, they appear with a button called "x". This is optional
 * (boolean) but the default is true.
 *
 * removeTag --> a function passed down by the parent component (TypeAhead) to remove the tag when
 * the "x" button is clicked.
 *
 * tagStyle variable assigns a CSS class (fieldTag or skillTag) based on the value
 * of tagType. Those classes are defined in Tag.css and determine the style of the tags.
 */
const Tag = ({ word, tagType, closable = true, removeTag }) => {
  const tagStyle = tagType === "field" ? "fieldTag" : "skillTag";

  /**
   * Prevent reloading the page on click. We do this because otherwise if we have more than one tag
   * and we click on one of them, the page reloads and both tags are deleted. We wanted to avoid this
   * as we want the user to have the possibility of just deleting one of the tags.
   *
   * handleRemove calls the removeTag function (handed down by TypeAhead parent component) in order to
   * handle the tag's removal from the list.
   */
  const handleRemove = (event) => {
    event.preventDefault();
    removeTag();
  };

  /**
   * We are using a conditional close button. If closable parameter is set to true, then
   * upon clicking the "x" button the tag will dissapear and be removed from the list of selected tags.
   */
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
