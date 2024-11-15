import React from "react";
import Parse from "parse";
import PrimaryButton from "../Components/PrimaryButton";
import SecondaryButton from "../Components/SecondaryButton";

const Profile = () => {
  const handleLogout = async function () {
    try {
      await Parse.User.logOut();
      const currentUser = Parse.User.current();
      if (currentUser === null) {
        console.log("User logged out.");
      }
      //getCurrentUser(); // superfluous?
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <div>
      <h1>Welcome to your Profile Page</h1>
      <p>Tell people about yourself.</p>
      <button onClick={handleLogout}>Log out</button>
      <p>
        Current user:{" "}
        {Parse.User.current()
          ? Parse.User.current().get("username")
          : "No user logged in"}
      </p>
    </div>
  );
};

export default Profile;
