import React from "react";
import styled, { css } from "styled-components";

/**
 * A reusable component for buttons. It takes on several parameters in order for them
 * to be more customisable.
 *
 * variant --> it is either primary-button, secondary-button or connect-button-small. The styling differs for them.
 *
 * children --> acts as a placholder for whatever value we want to put in later. This
 * is the text that will appear on the button.
 */
const Button = ({ variant, onClick, children, href }) => {
  // Choose the appropriate button style based on the `variant` prop
  const ButtonComponent =
    variant === "primary-button"
      ? PrimaryButton
      : variant === "secondary-button"
      ? SecondaryButton
      : ConnectButtonSmall;

  if (href) {
    return (
      <ButtonComponent
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </ButtonComponent>
    );
  }

  return <ButtonComponent onClick={onClick}>{children}</ButtonComponent>;
};

export default Button;

// Base style for buttons
const BaseButton = css`
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  text-decoration: none;
  font-size: 15px;
  line-height: 1;

  &:hover {
    border-color: rgba(228, 115, 71, 1);
  }
`;

// Primary Button
const PrimaryButton = styled.button`
  ${BaseButton}
  background-color: rgba(228, 115, 71, 1);
  color: white;
  border: 1px solid rgba(228, 115, 71, 1);

  &:hover {
    background-color: white;
    color: rgba(228, 115, 71, 1);
  }
`;

// Secondary Button
const SecondaryButton = styled.button`
  ${BaseButton}
  background-color: white;
  color: rgba(228, 115, 71, 1);
  border: 1px solid rgba(228, 115, 71, 1);

  &:hover {
    background-color: rgba(228, 115, 71, 1);
    color: white;
  }
`;

// Small Connect Button
const ConnectButtonSmall = styled.button`
  ${BaseButton}
  background-color: white;
  color: rgba(228, 115, 71, 1);
  border: 1px solid rgba(228, 115, 71, 1);
  padding: 8px 12px;

  &:hover {
    background-color: rgba(228, 115, 71, 1);
    color: white;
  }
`;
