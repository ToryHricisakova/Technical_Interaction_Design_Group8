import React from "react";
import "../Button.css";

const PrimaryButton = ({ children }) => {
  const buttonStyle = {
    backgroundColor: "rgba(228, 115, 71, 1)",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  };

  return <button className="primary-button">{children}</button>;
};

export default PrimaryButton;
