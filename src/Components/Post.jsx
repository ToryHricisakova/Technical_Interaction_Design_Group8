import React, { useState } from "react";
import styled from "styled-components";
import BasicContainer from "../SharedCSS";

const Post = ({ profileImage, name, text }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <BasicContainer>
      <ProfileSection>
        <ProfileImage src={profileImage} alt={`${name}'s profile`} />
        <ProfileName>{name}</ProfileName>
      </ProfileSection>

      <PostText>{text}</PostText>

      <ActionSection>
        <ActionItem onClick={handleLike}>
          <BsHeart />
          <ActionText>{likes} Likes</ActionText>
        </ActionItem>
        <ActionItem>
          <BsChat />
          <ActionText>Comment</ActionText>
        </ActionItem>
        <ActionItem>
          <BsShare />
          <ActionText>Share</ActionText>
        </ActionItem>
      </ActionSection>
    </BasicContainer>
  );
};

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileName = styled.span`
  font-size: 1.1em;
  font-weight: bold;
  color: #34415d;
`;

const PostText = styled.p`
  font-size: 1em;
  line-height: 1.5;
  color: #333;
  margin: 10px 0;
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: #34415d;
  transition: color 0.3s ease;

  &:hover {
    color: #e47347;
  }
`;

const ActionText = styled.span`
  font-size: 0.9em;
  color: inherit;
`;

export default Post;