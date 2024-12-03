import { useEffect, useState } from "react";
import Parse from "parse";

export default function useUserProfile() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        console.log("Fetching current user...");
        const currentUser = Parse.User.current(); // get _User objectId
        if (currentUser) {
          console.log("Current User:", currentUser);
        } else {
          console.log("No logged-in user found.");
        }
        console.log("Querying USERS class...");
        const query = new Parse.Query("USERS");
        query.equalTo("user", currentUser);
        const userRecord = await query.first();
        console.log("setting the user ...");
        if (userRecord) {
          console.log("Found user in USERS:", userRecord);
        } else {
          console.log("No user profile found in USERS class for current user.");
        }
        setUser(userRecord);
      } catch (error) {
        console.log("Error fetching user data: " + error.message);
      } finally {
        setLoading(false); // Allows page to be shown.
      }
    };
    getCurrentUser();
  }, []);
  return [user, loading];
}
