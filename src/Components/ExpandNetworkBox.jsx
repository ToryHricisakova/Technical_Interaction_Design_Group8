import styled from "styled-components";
import HorizontalLine from "./HorizontalLine";
import { useState, useEffect, useRef } from "react";
import Parse from "parse";
import Tag from "./Tag";
import MiniProfile from "./MiniProfile";

const ExpandNetworkBox = () => {
  const [field, setField] = useState(null);

  // user/setUser state needs to passed down from further up to avoid duplicate code. Is on our to-do list.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chosenUsers, setChosenUsers] = useState([]);
  const fieldSet = useRef(false);
  const [profiles, setProfiles] = useState([]);
  const chosenUsersRef = useRef(chosenUsers);

  // Retrieve "USERS" database object from the logged in "_User" objectId.
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = Parse.User.current(); // get _User objectId
        const query = new Parse.Query("USERS");
        query.equalTo("user", currentUser);
        const userRecord = await query.first();
        setUser(userRecord);
      } catch (error) {
        console.log("Error fetching user data: " + error.message);
      } finally {
        setLoading(false); // Allows page to be shown.
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!fieldSet.current && user && user.get("fields")) {
      fieldSet.current = true;
      // ensure user has been fetched and field is only set once.
      try {
        const fields = user.get("fields");

        // Choose a random field-tag from the current user.
        const num = Math.floor(Math.random() * fields.length);
        setField(fields[num]);
        console.log("field to generate from set to " + fields[num]);
      } catch (error) {
        console.log("Error choosing field from user " + error);
      }
    }
  }, [user]);

  useEffect(() => {
    if (field && user) {
      chooseProfiles(3); // Generate 3 profiles
    }
  }, [field]);

  // const generateProfiles = () => {
  // query USERS table based on {field}
  // return random user based on matches. Check if already added to [chosenUsers]

  // Generate unique profile - keep array of objectId's in useState?
  // ensure profile is not current user

  // const query = new Parse.Query("USERS");
  // query.contains("fields", field);
  // const result = await query.find();
  // console.log(result);
  // return chooseProfile();
  // Current user being used below solely for testing purposes.
  // return (
  //   <MiniProfile
  //     first={user.get("firstName")}
  //     last={user.get("lastName")}
  //     fields={user.get("fields")}
  //     picture={user.get("profileImage").url()}
  //   />
  // );
  // };

  // Ensure chosenUsers most recent state can be accessed.
  useEffect(() => {
    chosenUsersRef.current = chosenUsers;
  }, [chosenUsers]);

  const chooseProfiles = async (amount) => {
    if (!user || !field) {
      console.error(
        "User or field is undefined. Cannot choose relevant profiles"
      );
      return;
    }
    console.log(
      "generate profiles based on tags from user " + user.get("firstName")
    );

    const generatedProfiles = [];
    for (let i = 0; i < amount; i++) {
      const profile = await generateProfile();
      if (profile) generatedProfiles.push(profile); // add to already selected profiles
    }
    setProfiles(generatedProfiles);
  };

  const generateProfile = async () => {
    try {
      // Going through the fields in USERS
      const query = new Parse.Query("USERS");
      query.contains("fields", field);
      query.notEqualTo("user", Parse.User.current()); // Excluding the current user
      query.notContainedIn("objectId", chosenUsersRef.current); // avoiding duplicates

      const results = await query.find();
      if (results.length === 0) {
        console.log("No matching users found.");
        return null;
      }

      // Select a random user from the results
      const randomIndex = Math.floor(Math.random() * results.length);
      const selectedUser = results[randomIndex];

      // Add the selected user's objectId to the state to avoid duplicates
      setChosenUsers((prev) => [...prev, selectedUser.id]);
      console.log(
        "Chosen users: " +
          chosenUsersRef.current +
          " id added: " +
          selectedUser.id
      );
      // Return the generated profile component for the selected user
      return (
        selectedUser && (
          <MiniProfile
            first={selectedUser.get("firstName")}
            last={selectedUser.get("lastName")}
            fields={selectedUser.get("fields")}
            picture={selectedUser.get("profileImage").url()}
          />
        )
      );
    } catch (error) {
      console.error("Error generating profile:", error);
      return null;
    }
  };

  if (loading) return <p>Loading</p>;

  return (
    <Container>
      <TextContainer>
        <Title>Expand your network</Title>
        <SubTextContainer>
          <p>Based on your field:</p>
          <Tag word={field} tagType={"field"} closable={false} />
        </SubTextContainer>
      </TextContainer>

      <ProfilesContainer>
        {profiles && profiles[0]}
        <HorizontalLine width="100%" />
        {profiles && profiles[1]}
        <HorizontalLine width="100%" />
        {profiles && profiles[2]}
      </ProfilesContainer>
    </Container>
  );
};

export default ExpandNetworkBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 40px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  height: fit-content;
  min-width: 300px;
  width: 300px;
  gap: 20px;
  padding: 30px;
`;
const Title = styled.h1`
  font-size: 24px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
  margin: 10px 0 0 0;
`;
const ProfilesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
