import React, { useState } from "react";
import Tag from "./Tag";
import { ErrorMessage } from "../Components/SharedCSS";
import styled from "styled-components";

/**
 * Reusable component that allows the user to select an item from a set of options.
 * The user starts typing a wanted phrase and the options that match appear in a drop down.
 *
 * There are several parameters that make the component more customisable.
 *
 * items --> based on the option chosen, the corresponding class from the database is accessed.
 * The current options are fields, skills, countries.
 *
 * placeholder --> appears inside the search field
 *
 * tagType --> the tags are styled differently depending on what items they are displaying
 *
 * onSelectionChange --> a callback function triggered when the selected tags are updated
 *
 * maxNumber --> the maximum number of items that can be chosen
 *
 * States:
 * suggestions --> stores the list of suggestions that match the current input text
 *
 * text --> Stores the current input text value
 *
 * selectedTags --> Stores the array of tags (items) selected by the user
 */
const TypeAhead = ({
  items,
  placeholder,
  tagType,
  onSelectionChange,
  maxNumber,
  value,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState(value || []);
  const [errorMsg, setErrorMsg] = useState("");

  /**
   * The function is triggered when the user starts typing in the input field.
   * It updates the text state and filters the items array to find the suggestions
   * that match the input text using a case-insensitive regex (^${value}).
   * It sets the filtered results in the suggestions state.
   */
  const onTextChange = (e) => {
    const value = e.target.value;
    console.log("Input value:", value); // Debugging

    let newSuggestions = [];
    if (value.length > 0) {
      // prettier-ignore
      const regex = new RegExp(`^${value}`, "i");
      console.log("Items being filtered:", items); // Debugging
      newSuggestions = items.filter((v) => regex.test(v)).sort();
    }
    setSuggestions(newSuggestions);
    setText(value);
  };

  /**
   * The function is called when a suggestion is clicked.
   *
   * It adds the selected suggestion to selectedTags (if it is not alread there and it
   * doesn't exceed the maxNumber limit).
   *
   * It calls the onSelectionChange prop with the updated list of selected tags, and then clears
   * the input field and suggestions.
   */
  const suggestionSelected = (value) => {
    setSelectedTags((prevTags) => {
      if (!prevTags.includes(value)) {
        if (prevTags.length >= maxNumber) {
          //limiting the number of fields (or any type of tag) that can be added
          setErrorMsg(
            `You can only select up to ${maxNumber} ${tagType}s. Remove a field to add a new one.`
          );
          return prevTags;
        }
        const updatedTags = [...prevTags, value];
        onSelectionChange(updatedTags);
        return updatedTags;
      }
      return prevTags;
    });
    setText("");
    setSuggestions([]);
  };

  /**
   * The function removes a selected tag when the user clicks the close button in
   * a Tag component. It updates the selectedTags state and calls onSelectionChange.
   */
  const removeTag = (tag) => {
    setSelectedTags((prevTags) => {
      const updatedTags = prevTags.filter((t) => t !== tag);
      onSelectionChange(updatedTags);
      if (prevTags.length <= maxNumber) {
        setErrorMsg("");
      }
      return updatedTags;
    });
  };

  /**
   * The function generates Tag components for each selected tag.
   * The last line passes the removeTag function to allow tag removal.
   * (passing the removeTag function as a prop - giving the createTags access to it
   * so that createTags can interact with the parent's (the component's) state)
   */
  const createTags = () => {
    return selectedTags.map((tag, index) => (
      <Tag
        key={index}
        word={tag}
        tagType={tagType}
        closable={true}
        removeTag={() => removeTag(tag)}
      />
    ));
  };

  /**
   * The function dynamically renders the filtered suggestions in a <ul> element.
   * It calls suggestionSelected when a suggestion is clicked.
   */
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <SuggestionsList>
        {suggestions.map((item) => (
          <SuggestionItem key={item} onClick={() => suggestionSelected(item)}>
            {item}
          </SuggestionItem>
        ))}
      </SuggestionsList>
    );
  };

  return (
    <div>
      <TypeAheadWrapper>
        <div className="TypeAhead">
          <InputField
            onChange={onTextChange}
            placeholder={placeholder}
            value={text}
            type="text"
          />
          {renderSuggestions()}
        </div>
      </TypeAheadWrapper>
      <TagContainer>{createTags()}</TagContainer>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </div>
  );
};

export default TypeAhead;

const TypeAheadWrapper = styled.div`
  width: 200px;
  border: 1px solid rgba(172, 171, 169, 1);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.18);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.73);
`;

const InputField = styled.input`
  width: 100%;
  background-color: white;
  border: 1px rgba(172, 171, 169, 1);
  border-radius: 10px 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: black;
  padding: 10px 5px;
  padding-left: 10px;
  box-sizing: border-box;
  outline: none;
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  text-align: left;
  margin: 0;
  padding: 0;
  border-top: 1px solid gray;

  &::before {
    content: "";
  }
`;

const SuggestionItem = styled.li`
  padding: 10px 5px;
  cursor: pointer;

  &:hover {
    background: rgba(172, 171, 169, 0.2);
    border-radius: 10px;
    color: rgba(228, 115, 71, 1);
  }
`;

const TagContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 100%;
  overflow: visible;
`;
