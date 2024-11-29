import styled from "styled-components";
import Parse from "parse";
import TagGenerator from "./TagGenerator";
import HorizontalLine from "./HorizontalLine";
import useUserProfile from "../Hooks/useUserProfile.js";

const ProfileBody = () => {
  const [user, loading] = useUserProfile();

  if (loading) return <p>Loading</p>; // Ensures that the page is not rendered before the users-data is fetched from the database.

  return (
    <BodyWrapper>
      <ActivityWrapper>
        <Title>Your Activity</Title>
        <HorizontalLine width="200px" />
        <p>Coming soon...</p>
        <p>
          Current user:{" "}
          {Parse.User.current()
            ? Parse.User.current().get("username")
            : "No user logged in"}
        </p>
      </ActivityWrapper>
      <TagContainer>
        <Title>Your Tags</Title>
        <HorizontalLine width="200px" />
        <div>
          <SubTitle>Fields</SubTitle>
          <TagsLayout>
            {TagGenerator({ array: user.get("fields"), tagType: "field" })}
          </TagsLayout>
        </div>

        <div>
          <SubTitle>Skills</SubTitle>
          <TagsLayout>
            {TagGenerator({ array: user.get("skills"), tagType: "skill" })}
          </TagsLayout>
        </div>
      </TagContainer>
    </BodyWrapper>
  );
};

export default ProfileBody;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border-radius: 40px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  min-height: 350px;
  height: fit-content;
  width: 800px;
  min-width: 400px;
`;
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 40%;
  height: 100%;
  padding: 30px 10px 10px 10px;
  gap: 10px;
  /* border: solid 2px purple; */
`;
const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 60%;
  height: 100%;
  padding: 30px 10px 10px 30px;
  gap: 10px;
  /* border: solid 2px blue; */
`;
const TagsLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* border: 1px blue solid; */
`;
const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 0px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
`;
const SubTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 0px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
`;
