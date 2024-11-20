import React from "react";
import RegistrationForm from "../Components/RegistrationForm";
import { PageWithImage } from "../SharedCSS";

const Registration = ({ setIsLoggedIn }) => {
  return (
    <PageWithImage>
      <RegistrationForm setIsLoggedIn={setIsLoggedIn} />
    </PageWithImage>
  );
};

export default Registration;
