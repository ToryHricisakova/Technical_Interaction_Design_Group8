import React from "react";
import Parse from "parse";
import ProfileHeader from "../Components/ProfileHeader";

const Profile = () => {
  return (
    <div>
      <h1>Welcome to your Profile Page</h1>
      <p>Tell people about yourself.</p>
      <p>
        Current user:{" "}
        {Parse.User.current()
          ? Parse.User.current().get("username")
          : "No user logged in"}
      </p>
      <ProfileHeader />
    </div>
  );
};

export default Profile;
