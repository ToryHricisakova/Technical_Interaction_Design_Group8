import styled from "styled-components";
import HorizontalLine from "./HorizontalLine";
import { useState, useEffect, useRef } from "react";
import Parse from "parse";
import Tag from "./Tag";
import MiniProfile from "./MiniProfile";
import useUserProfile from "../Hooks/useUserProfile.jsx";
import "../Components/Spinner.css";

/**
 * A box showing three suggested profiles to connect to, based on a random field from the logged in user.
 */
const ExpandNetworkBox = () => {
  const [field, setField] = useState(null);
  const [user] = useUserProfile();
  const fieldSet = useRef(false);
  const [profiles, setProfiles] = useState([]);

  // A random field is chosen from the fields that the logged-in user possesses.
  useEffect(() => {
    if (!fieldSet.current && user && user.get("fields")) {
      // "fieldSet" boolean is used to ensure the field is only selected once for the component.
      fieldSet.current = true;

      try {
        const fields = user.get("fields");
        const num = Math.floor(Math.random() * fields.length);
        setField(fields[num]);
      } catch (error) {
        console.log("Error choosing field from user: " + error);
      }
    }
  }, [user]);

  // When field and user has been set, chooseProfiles finds relevant users to display from database.
  useEffect(() => {
    if (field && user) {
      chooseProfiles();
    }
  }, [field]);

  // Profiles are chosen based on the chosen field-tag and styled profile components are created.
  const chooseProfiles = async () => {
    if (!user || !field) {
      console.error(
        "User or field is undefined. Cannot choose relevant profiles"
      );
      return;
    }

    try {
      // Finds relevant profiles in our "USERS"-table to display based on the chosen field tag.
      const query = new Parse.Query("USERS");
      query.contains("fields", field);
      query.notEqualTo("user", Parse.User.current()); // Excludes the current user.

      const results = await query.find();

      // If no results found, return early.
      if (results.length === 0) {
        console.log("No matching users found.");
        return null;
      }

      // 3 users are chosen and stored in a set in order to avoid duplicates.
      const chosenUsers = new Set();
      // If exactly 3 users are found, these 3 are added to the set.
      if (results.length <= 3) {
        results.forEach((profile) => chosenUsers.add(profile));
      } else {
        // If more than 3 users are found, we add random users until we have 3 in the set (while-loop since duplicates might occur).
        while (chosenUsers.size < 3) {
          const randomIndex = Math.floor(Math.random() * results.length);
          chosenUsers.add(results[randomIndex]);
        }
      }

      // MiniProfiles are created for the chosen users
      createProfiles(chosenUsers);
    } catch (error) {
      console.error("Error choosing users:", error);
      return null;
    }
  };

  // Creates styled MiniProfiles based on the array of Parse user objects passed to it.
  const createProfiles = (chosenUsers) => {
    const profiles = [];
    chosenUsers.forEach((user) => {
      profiles.push(
        <MiniProfile
          objectId={user.id} // Ensure each profile has a unique key
          firstName={user.get("firstName")}
          lastName={user.get("lastName")}
          fields={user.get("fields")}
          picture={user.get("profileImage").url()}
        />
      );
    });
    // useState for profiles is updated to enable displayal
    setProfiles(profiles);
  };

  return (
    <Container>
      <TextContainer>
        <Title>Expand your network</Title>
        <SubTextContainer>
          <Text>Based on your field:</Text>
          {field === null || field === undefined ? (
            <p>No available fields to choose from</p>
          ) : (
            <Tag word={field} tagType={"field"} closable={false} />
          )}
        </SubTextContainer>
      </TextContainer>

      <ProfilesContainer>
        {profiles && profiles[0]}
        <HorizontalLine width="100%" />
        {profiles && profiles[1]}
        {profiles[2] && <HorizontalLine width="100%" />}
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
  border-radius: 20px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  height: fit-content;
  min-width: 280px;
  width: 280px;
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
  gap: 10px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  p {
    padding: 0px;
  }
  margin: 15px 0 10px 0;
`;
const Text = styled.p`
  margin: 0;
`;
