import React from "react";
import styled from "styled-components";

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
  const TagStyle = tagType === "field" ? FieldTag : SkillTag;

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
    <TagStyle>
      {word}
      {closable && <ClosingTag onClick={handleRemove}>x</ClosingTag>}
    </TagStyle>
  );
};

export default Tag;

const FieldTag = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  max-width: 100%;
  background-color: #f19e7d;
  color: #000000;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 12px;
  margin: 5px;
  line-height: 1;
  white-space: nowrap;
`;

const SkillTag = styled.div`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  position: relative;
  background-color: #d5dee4;
  color: #000000;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 12px;
  margin: 5px;
  line-height: 1;
  white-space: nowrap;
`;

const ClosingTag = styled.button`
  top: 50%;
  background-color: transparent;
  border-color: #ed7748;
  border-radius: 40px;
  color: #ed7748;
  font-weight: bold;
  font-size: 12px;
  padding: 1px 5px;
  cursor: pointer;
  margin-left: 5px;
`;
