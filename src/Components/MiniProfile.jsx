import ConnectButton from "./ConnectButton";
import TagGenerator from "./TagGenerator";
import styled from "styled-components";

const MiniProfile = (props) => {
  const objectId = props.objectId;
  const firstName = props.firstName;
  const lastName = props.lastName;
  const fields = props.fields;
  const picture = props.picture;
  //console.log("Props received in MiniProfile:", props);

  return (
    // profile picture, name, connect-button, fields
    <ProfileWrapper>
      <PictureNameConnectWrapper>
        <PictureContainer>
          <ProfileImage src={picture} />
        </PictureContainer>
        <NameConnectContainer>
          <Name>
            {firstName} {lastName}
          </Name>
          <ConnectButton />
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
  //border: solid 2px black;
`;
const PictureNameConnectWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  //border: solid 2px black;
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
  //border: 2px green dashed;
`;
const FieldsContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //border: yellow 2px solid;
`;
