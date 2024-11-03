import React from "react";
import "../TypeAhead.css";

export default class TypeAhead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onTextChange = (e) => {
    const { items } = this.props;
    let suggestions = [];
    const value = e.target.value;

    console.log("Input value:", value); // Debugging

    if (value.length > 0) {
      // prettier-ignore
      const regex = new RegExp(`^${value}`, "i");

      console.log("Items being filtered:", items); // Debugging

      suggestions = items.filter((v) => regex.test(v)).sort();
    }

    this.setState(() => ({
      suggestions,
      text: value,
    }));
  };

  suggestionSelected = (value) => {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    console.log("suggestions: ", suggestions);
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((careerfield) => (
          <li
            key={careerfield}
            onClick={(e) => this.suggestionSelected(careerfield)}
          >
            {careerfield}
          </li>
        ))}
      </ul>
    );
  };
  render() {
    const { text } = this.state;
    const { placeholder } = this.props;
    return (
      <div className="TypeAhead">
        <input
          onChange={this.onTextChange}
          placeholder={placeholder}
          value={text}
          type="text"
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}
