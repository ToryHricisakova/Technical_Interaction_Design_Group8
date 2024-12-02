import React, { useState } from "react";
import Button from "./Button";

const ConnectButton = () => {
  const [buttonText, setButtonText] = useState("+ Connect");

  const handleClick = () => {
    setButtonText("Request Sent");
  };

  return (
    <Button className="secondary-button" onClick={handleClick}>
      {buttonText}
    </Button>
  );
};

export default ConnectButton;
