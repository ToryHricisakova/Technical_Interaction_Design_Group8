import styled from "styled-components";
import Parse from "parse";
import TagGenerator from "./TagGenerator";
import HorizontalLine from "./HorizontalLine";
import { useState, useEffect } from "react";
import PostGenerator from "./PostGenerator.jsx";

const ProfileBody = ({ user }) => {
  const [displayPosts, setDisplayPosts] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);

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

  useEffect(() => {
    createPosts();
  }, [fetchedPosts]);

  const createPosts = () => {
    if (fetchedPosts.length !== 0) {
      fetchedPosts && console.log("create post based on: " + fetchedPosts);

      setDisplayPosts(<PostGenerator array={fetchedPosts} style="small" />);
    } else {
      setDisplayPosts([]);
    }
  };

  const generateFields = () => {
    if (user.get("fields") !== undefined) {
      return TagGenerator({ array: user.get("fields"), tagType: "field" });
    }
    return null;
  };

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
        {displayPosts}
      </ActivityWrapper>
      <TagContainer>
        <Title>Tags</Title>
        <HorizontalLine width="200px" />
        <div>
          <SubTitle>Fields</SubTitle>
          <TagsLayout>{user && generateFields()}</TagsLayout>
        </div>

        <div>
          <SubTitle>Skills</SubTitle>
          <TagsLayout>{user && generateSkills()}</TagsLayout>
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
  border-radius: 20px;
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
