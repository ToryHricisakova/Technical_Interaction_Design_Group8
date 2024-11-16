import React from "react";
import closeIcon from '../../public/MediaFiles/closeicon.svg';

const CloseIcon = ({ onClick }) => {
  const iconStyle = {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    position: "absolute",
    top: "30px",
    right: "30px",
  };

  return (
    <img src={closeIcon} alt="Close" style={iconStyle} onClick={onClick} />
  );
};

export default CloseIcon;
