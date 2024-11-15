import React, { useState } from "react";
import SecondaryButton from "./SecondaryButton";

const ConnectButton = () => {
  const [buttonText, setButtonText] = useState("+ Connect");

  const handleClick = () => {
    setButtonText("Request Sent");
  };

  return (
    <SecondaryButton onClick={handleClick}>
      {buttonText}
    </SecondaryButton>
  );
};

export default ConnectButton;