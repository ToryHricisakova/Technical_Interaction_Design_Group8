import React from "react";
import PrimaryButton from "../Components/PrimaryButton";
import SecondaryButton from "../Components/SecondaryButton";
import { Link } from "react-router-dom";

const Onboarding3 = () => {
  return (
    <div>
      <h1>Onboarding Page 3</h1>
      <Link to="/landingpage">
        <PrimaryButton>Finish</PrimaryButton>
      </Link>
    </div>
  );
};

export default Onboarding3;
