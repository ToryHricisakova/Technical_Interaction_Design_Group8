import React, { useState } from "react";
import "../TypeAhead.css";
import Tag from "./Tag";

// export default class TypeAhead extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       suggestions: [],
//       text: "",
//       selectedTags: [],
//     };
//   }
// onTextChange = (e) => {
//     const { items } = this.props;
//     let suggestions = [];
//     const value = e.target.value;

//     console.log("Input value:", value); // Debugging

//     if (value.length > 0) {
//       // prettier-ignore
//       const regex = new RegExp(`^${value}`, "i");

//       console.log("Items being filtered:", items); // Debugging

//       suggestions = items.filter((v) => regex.test(v)).sort();
//     }

//     this.setState(() => ({
//       suggestions,
//       text: value,
//     }));
//   };

//   suggestionSelected = (value) => {
//     this.setState(
//       (prevState) => {
//         if (prevState.selectedTags.includes(value)) {
//           // Check if tag has already been added.
//           return {
//             text: value,
//             suggestions: [],
//           };
//         }

//         return {
//           // Add new tag.
//           text: "", // Clear text field for next input
//           suggestions: [],
//           selectedTags: [...prevState.selectedTags, value],
//         };
//       },
//       () => {
//         console.log("selectedTags: ", this.state.selectedTags); // Debugging
//       }
//     );
//   };

//   // Method to remove a tag
//   removeTag = (tag) => {
//     this.setState((prevState) => ({
//       selectedTags: prevState.selectedTags.filter((t) => t !== tag),
//     }));
//   };

//   createTags = () => {
//     return this.state.selectedTags.map((tag, index) => (
//       <Tag
//         key={index}
//         word={tag}
//         tagType={this.props.tagType}
//         removeable={true}
//         removeTag={() => this.removeTag(tag)} // Pass removeTag function
//       />
//     ));
//   };

//   renderSuggestions = () => {
//     const { suggestions } = this.state;
//     console.log("suggestions: ", suggestions);
//     if (suggestions.length === 0) {
//       return null;
//     }
//     return (
//       <ul>
//         {suggestions.map((careerfield) => (
//           <li
//             key={careerfield}
//             onClick={(e) => this.suggestionSelected(careerfield)}
//           >
//             {careerfield}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   render() {
//     const { text } = this.state;
//     const { placeholder } = this.props;

//     return (
//       <div>
//         <div className="TypeAhead">
//           <input
//             onChange={this.onTextChange}
//             placeholder={placeholder}
//             value={text}
//             type="text"
//           />

//           {this.renderSuggestions()}
//         </div>

//         <div className="tag-container">{this.createTags()}</div>
//       </div>
//     );
//   }
// }

const TypeAhead = ({ items, placeholder, tagType }) => {
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
        return [...prevTags, value];
      }
      return prevTags;
    });
    setText("");
    setSuggestions([]);
    console.log("selectedTags: ", selectedTags);
  };

  // Method to remove a tag
  const removeTag = (tag) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const createTags = () => {
    return selectedTags.map((tag, index) => (
      <Tag
        key={index}
        word={tag}
        tagType={tagType}
        removeable={true}
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
        {suggestions.map((careerfield) => (
          <li key={careerfield} onClick={() => suggestionSelected(careerfield)}>
            {careerfield}
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
