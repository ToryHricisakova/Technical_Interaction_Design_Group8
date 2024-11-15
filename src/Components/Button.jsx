import React from "react";
import "../Button.css";

// "children" acts as a placholder for whatever value we want to put in later. This
// is what will appear on the button.
const Button = ({ className, onClick, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

// Changed this file, so that we only have a Button instead
// of a PrimaryButton and a SecondaryButton files.
// Have to still change the name of this file, but first it would be
// good to change all instances of current primary and secondary buttons
// to add the className before merging the two components.
