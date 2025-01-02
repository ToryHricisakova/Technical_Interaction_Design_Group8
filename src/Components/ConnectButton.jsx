import React, { useState } from "react";
import Button from "./Button";

const ConnectButton = ({ variant }) => {
  const [buttonText, setButtonText] = useState("+ Connect");

  const handleClick = () => {
    setButtonText("Request Sent");
  };

  return (
    <Button
      variant={variant ? variant : "secondary-button"}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  );
};

export default ConnectButton;
