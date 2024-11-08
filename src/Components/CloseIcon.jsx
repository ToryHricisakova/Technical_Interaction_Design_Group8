import React from "react";
import closeIcon from '../MediaFiles/closeicon.svg';

const CloseIcon = ({ onClick }) => {
  const iconStyle = {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    position: "absolute",
    top: "30px",
    right: "30px",
    //zIndex: 1000, // Ensure it's on top of other elements
  };

  return (
    <img src={closeIcon} alt="Close" style={iconStyle} onClick={onClick} />
  );
};

export default CloseIcon;
