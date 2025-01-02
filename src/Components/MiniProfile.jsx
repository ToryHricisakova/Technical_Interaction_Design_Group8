import { Link } from "react-router-dom";
import ConnectButton from "./ConnectButton";
import TagGenerator from "./TagGenerator";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Parse from "parse";

// Returns a component that is a miniature profile representation. Used for the ExpandNetworkBox.
const MiniProfile = (props) => {
  const objectId = props.objectId;
  const firstName = props.firstName;
  const lastName = props.lastName;
  const fields = props.fields;
  const picture = props.picture;

  const [profileURL, setProfileURL] = useState("");

  // Retrieves the "_User" objectId & sets profileURL to enable linking to it.
  useEffect(() => {
    const getUser = async () => {
      try {
        const query = new Parse.Query("USERS");
        query.equalTo("objectId", objectId);
        const userRecord = await query.first();
        const userValue = userRecord.get("user");
        setProfileURL("/" + userValue.id);
      } catch (error) {
        console.log("Error fetching user data: " + error.message);
      }
    };
    getUser();
  }, [objectId]);

  // Returns styled profile-component containing profile picture, name, fields and a connect-button.
  return (
    <ProfileWrapper>
      <PictureNameConnectWrapper>
        <Link to={profileURL}>
          <PictureContainer>
            <ProfileImage src={picture} />
          </PictureContainer>
        </Link>
        <NameConnectContainer>
          <StyledLink to={profileURL}>
            <Name>
              {firstName} {lastName}
            </Name>
          </StyledLink>
          <ConnectButton variant="connect-button-small" />
        </NameConnectContainer>
      </PictureNameConnectWrapper>
      <FieldsContainer>
        {fields && <TagGenerator array={fields} tagType="field" />}
      </FieldsContainer>
    </ProfileWrapper>
  );
};

export default MiniProfile;

const ProfileWrapper = styled.div`
  margin: 10px 0 10px 10px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;
const PictureNameConnectWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
`;
const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;
const PictureContainer = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
  width: 100px;
  top: 100px;
`;
const Name = styled.h3`
  text-align: left;
  font-size: 16px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
  margin: 0 0 10px 0;
`;
const NameConnectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-align: left;
  width: 68%;
`;
const FieldsContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
