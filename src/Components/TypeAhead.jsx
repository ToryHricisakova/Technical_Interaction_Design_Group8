import React, { useState } from "react";
import "../Components/TypeAhead.css";
import Tag from "./Tag";

const TypeAhead = ({
  items,
  placeholder,
  tagType,
  onSelectionChange,
  maxNumber,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

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

  const suggestionSelected = (value) => {
    setSelectedTags((prevTags) => {
      if (!prevTags.includes(value)) {
        if (prevTags.length >= maxNumber) {
          //limiting the number of fields (or any type of tag) that can be added
          alert(
            "You can only select up to " + maxNumber + " " + tagType + "s."
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
    //console.log("selectedTags: ", selectedTags);
  };

  // Method to remove a tag
  const removeTag = (tag) => {
    setSelectedTags((prevTags) => {
      const updatedTags = prevTags.filter((t) => t !== tag);
      onSelectionChange(updatedTags);
      return updatedTags;
    });
  };

  const createTags = () => {
    return selectedTags.map((tag, index) => (
      <Tag
        key={index}
        word={tag}
        tagType={tagType}
        closable={true}
        removeTag={() => removeTag(tag)} // Pass removeTag function
      />
    ));
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => (
          <li key={item} onClick={() => suggestionSelected(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div className="TypeAhead">
        <input
          onChange={onTextChange}
          placeholder={placeholder}
          value={text}
          type="text"
        />

        {renderSuggestions()}
      </div>

      <div className="tag-container">{createTags()}</div>
    </div>
  );
};

export default TypeAhead;
