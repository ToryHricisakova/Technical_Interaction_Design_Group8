import styled from "styled-components";
import Parse from "parse";
import TagGenerator from "./TagGenerator";
import HorizontalLine from "./HorizontalLine";
import { useState, useEffect } from "react";
import PostGenerator from "./PostGenerator.jsx";

const ProfileBody = ({ user }) => {
  const [styledPosts, setStyledPosts] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);

  // Fetch all posts that have been created by the "user" passed to the component as a prop.
  useEffect(() => {
    const fetchPosts = async () => {
      const query = new Parse.Query("POSTS");
      query.equalTo("postedBy", user);
      query.descending("dateofPosting");

      try {
        const result = await query.find();
        setFetchedPosts(result);
      } catch (error) {
        console.log("There was an error fetching the posts" + error.message);
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [user]);

  // Empties the styledPosts array when the user is changed (in order to ensure an updated profile).
  useEffect(() => {
    setStyledPosts([]);
  }, [user]);

  // Create styled posts-components (small version) to be displayed on the profile.
  // Update posts whenever new posts are fetched (happens when a new user is passed as a prop).
  useEffect(() => {
    if (fetchedPosts.length !== 0) {
      setStyledPosts(<PostGenerator array={fetchedPosts} style="small" />);
    } else {
      setStyledPosts([]);
    }
  }, [fetchedPosts]);

  // Generate fields for the profile based on the user passed as a prop.
  const generateFields = () => {
    if (user.get("fields") !== undefined) {
      return TagGenerator({ array: user.get("fields"), tagType: "field" });
    }
    return null;
  };

  // Generate tags for the profile based on the user passed as a prop.
  const generateSkills = () => {
    if (user.get("skills") !== undefined) {
      return TagGenerator({ array: user.get("skills"), tagType: "skill" });
    }
    return null;
  };

  return (
    <BodyWrapper>
      <ActivityWrapper>
        <Title>Activity</Title>
        <HorizontalLine width="200px" />
        {styledPosts}
      </ActivityWrapper>

      <TagContainer>
        <Title>Tags</Title>
        <HorizontalLine width="200px" />

        <SubTitle>Skills</SubTitle>
        <TagsLayout>{user && generateSkills()}</TagsLayout>

        <SubTitle>Fields</SubTitle>
        <TagsLayout>{user && generateFields()}</TagsLayout>

        <SubTitle>Education</SubTitle>
        <SubTitle>Work experience</SubTitle>
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
  border-radius: 20px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  min-height: 350px;
  height: fit-content;
  width: 860px;
  min-width: 400px;
`;
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 40%;
  height: 100%;
  padding: 50px 10px 10px 10px;
  gap: 10px;
`;
const ActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 60%;
  height: 100%;
  padding: 50px 10px 10px 30px;
  gap: 10px;
`;
const TagsLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
