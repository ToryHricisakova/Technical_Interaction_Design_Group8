import styled from "styled-components";
import HorizontalLine from "./HorizontalLine";
import { useState, useEffect } from "react";
import Parse from "parse";
import Tag from "./Tag";

const ExpandNetworkBox = () => {
  const [field, setField] = useState(null);

  // user/setUser state needs to passed down from further up to avoid duplicate code. Is on our to-do list.
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    if (user && user.get("fields")) {
      // ensure user has been fetched.
      try {
        const fields = user.get("fields");

        // Choose a random field-tag from the current user.
        if (fields.length > 0) {
          const num = Math.floor(Math.random() * fields.length);
          setField(fields[num]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

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
        <p>*Profile*</p>
        <HorizontalLine width="100%" />
        <p>*Profile*</p>
        <HorizontalLine width="100%" />
        <p>*Profile*</p>
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
