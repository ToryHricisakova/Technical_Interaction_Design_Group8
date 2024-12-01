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
  const fieldSet = useRef(false);
  const [profiles, setProfiles] = useState([]);

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

  // Choosing a random field-tag from the current user. Ensures user has been fetched and field is only set once.
  useEffect(() => {
    if (!fieldSet.current && user && user.get("fields")) {
      fieldSet.current = true;

      try {
        const fields = user.get("fields");
        const num = Math.floor(Math.random() * fields.length);
        setField(fields[num]);
        console.log("field to generate from set to " + fields[num]);
      } catch (error) {
        console.log("Error choosing field from user " + error);
      }
    }
  }, [user]);

  // When field and user has been set, chooseProfiles finds relevant users to display from database.
  useEffect(() => {
    if (field && user) {
      chooseProfiles();
      console.log(
        "generating miniProfiles based on tags from user " +
          user.get("firstName") +
          user.get("lastName")
      );
    }
  }, [field]);

  const chooseProfiles = async () => {
    if (!user || !field) {
      console.error(
        "User or field is undefined. Cannot choose relevant profiles"
      );
      return;
    }

    try {
      // Finding relevant profiles in our "USERS"-table to display based on the chosen field tag.
      const query = new Parse.Query("USERS");
      query.contains("fields", field);
      query.notEqualTo("user", Parse.User.current()); // Excluding the current user

      const results = await query.find();
      if (results.length === 0) {
        console.log("No matching users found.");
        return null;
      }

      const chosenUsers = new Set(); // Using set to avoid duplicates.
      // Ensuring we choose 3 unique relevant profiles:
      if (results.length <= 3) {
        results.forEach((profile) => chosenUsers.add(profile));
      } else {
        while (chosenUsers.size < 3) {
          const randomIndex = Math.floor(Math.random() * results.length);
          chosenUsers.add(results[randomIndex]);
        }
      }
      createProfiles(chosenUsers);
    } catch (error) {
      console.error("Error choosing users:", error);
      return null;
    }
  };

  const createProfiles = (chosenUsers) => {
    const profiles = [];
    chosenUsers.forEach((user) => {
      profiles.push(
        <MiniProfile
          first={user.get("firstName")}
          last={user.get("lastName")}
          fields={user.get("fields")}
          picture={user.get("profileImage").url()}
        />
      );
    });

    setProfiles(profiles);
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
  border-radius: 20px;
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
