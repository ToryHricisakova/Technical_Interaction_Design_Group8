import React from "react";
import "../Components/Button.css";

/**
 * A reusable component for buttons. It takes on several parameters in order for them
 * to be more customisable.
 *
 * className --> it is either primaryButton or secondaryButton. The styling differs for the two.
 *
 * children --> acts as a placholder for whatever value we want to put in later. This
 * is the text that will appear on the button.
 */
const Button = ({ className, onClick, children, href }) => {
  if (href) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
