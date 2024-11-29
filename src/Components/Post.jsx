import React from "react";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";

const Post = ({ profileImage, name, profession, text }) => {
  return (
    <PostContainer>
      <PostHeader>
        <ProfileImage src={profileImage} alt={`${name}'s profile`} />
        <UserInfo>
          <UserName>{name}</UserName>
          <UserProfession>{profession}</UserProfession>
        </UserInfo>
      </PostHeader>
      <PostContent>{text}</PostContent>
      <PostDate>Just now</PostDate>
      <PostActions>
        <LikeIcon />
        <ActionIcon className="bi bi-chat" />
        <ActionIcon className="bi bi-share" />
      </PostActions>
    </PostContainer>
  );
};

// Styled Components

const PostContainer = styled.div`
  max-width: 500px;  
  width: 100%;      
  padding: 32px 48px;
  border-radius: 10px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  position: relative;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
  justify-content: flex-start;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  align-items: flex-start;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #34415d;

`;

const UserProfession = styled.span`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
  justify-content: flex-start;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: #888;
  text-align: left;
`;

const PostContent = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.5;
  text-align: left;
`;

const PostActions = styled.div`
  justify-content: flex-start;  
  display: flex;
  gap: 20px;
  margin-top: 10px; 
`;

const ActionIcon = styled.i`
  font-size: 20px;
  color: #34415d;
  cursor: pointer;

  &:hover {
    color: #e47347;
  }
`;

export default Post;