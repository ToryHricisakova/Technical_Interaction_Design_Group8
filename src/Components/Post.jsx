import React from "react";
import styled from "styled-components";
import LikeIcon from "./LikeIcon";
import Tag from "../Components/Tag";
import Parse from "parse";

const Post = ({
  profileImage,
  name,
  text,
  media,
  fields,
  dateofPosting,
  numberOfLikes,
  objectId,
}) => {
  const formattedDate = new Date(dateofPosting).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const mediaUrl = media instanceof Parse.File ? media.url() : media;

  return (
    <PostContainer>
      <PostHeader>
        <ProfileImage src={profileImage} alt={`${name}'s profile`} />
        <UserInfo>
          <UserName>{name}</UserName>
          {/* Display tags under the name */}
          {fields && fields.length > 0 && (
            <TagsContainer>
              {fields.map((field, index) => (
                <Tag
                  tagType="field"
                  key={index}
                  word={field}
                  closable={false}
                />
              ))}
            </TagsContainer>
          )}
        </UserInfo>
      </PostHeader>

      <PostContent>{text}</PostContent>

      {mediaUrl && <Media src={mediaUrl} alt="Post Media" />}

      <PostDate>{formattedDate}</PostDate>

      <PostActions>
        <LikeIcon objectId={objectId} initialLikes={numberOfLikes} />
        <ActionIcon className="bi bi-chat" />
        <ActionIcon className="bi bi-share" />
      </PostActions>
    </PostContainer>
  );
};

// Styled Components

const PostContainer = styled.div`
  max-width: 700px;
  width: 100%;
  padding: 32px 48px;
  border-radius: 20px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  position: relative;
  margin-bottom: 30px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
  justify-content: flex-start;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  align-items: flex-start;
  object-fit: cover;
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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .fieldTag {
    font-size: 10px;
  }
`;

const Media = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 8px;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: #888;
  text-align: left;
  margin-top: 15px;
`;

const PostContent = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.5;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
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
