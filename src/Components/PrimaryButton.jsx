import React from "react";
import "../Button.css";

const PrimaryButton = ({ children }) => {
  return <button className="primary-button">{children}</button>;
};

export default PrimaryButton;
