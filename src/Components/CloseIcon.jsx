import React from "react";
import closeIcon from "../MediaFiles/closeicon.png";

const CloseIcon = ({ onClick }) => {
  const iconStyle = {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    position: "absolute",
    top: "20px",
    right: "20px",
  };

  return (
    <img src={closeIcon} alt="Close" style={iconStyle} onClick={onClick} />
  );
};

export default CloseIcon;
