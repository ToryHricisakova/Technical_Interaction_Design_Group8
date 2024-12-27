import React, { useState } from "react";
import Button from "./Button";

const ConnectButton = ({ className }) => {
  const [buttonText, setButtonText] = useState("+ Connect");

  const handleClick = () => {
    setButtonText("Request Sent");
  };

  return (
    <Button
      className={className ? className : "secondary-button"}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  );
};

export default ConnectButton;
