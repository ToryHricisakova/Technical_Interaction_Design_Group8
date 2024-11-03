import React from "react";
import fields from "../MediaFiles/fields";
import TypeAhead from "../Components/TypeAhead";
import skills from "../MediaFiles/skills";

const People = () => {
  return (
    <div>
      <h1>Welcome to Network Page</h1>
      <p>Connect to people here.</p>
      <TypeAhead items={fields} placeholder="Search career fields here..." />
      <TypeAhead items={skills} placeholder="Search skills here..." />
    </div>
  );
};

export default People;
