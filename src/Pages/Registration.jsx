import React from "react";
import RegistrationForm from "../Components/RegistrationForm";
import { PageWithImage } from "../Components/SharedCSS";
// Page for user registration containing the RegistrationForm component.
const Registration = () => {
  return (
    <PageWithImage>
      <RegistrationForm />
    </PageWithImage>
  );
};

export default Registration;
