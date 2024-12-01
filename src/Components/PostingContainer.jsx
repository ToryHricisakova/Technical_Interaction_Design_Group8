import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import useUserProfile from "../Hooks/useUserProfile";
import Parse from "parse";

const PostingContainer = () => {
  const [user, loading] = useUserProfile();
  const [text, setText] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");


  if (!loading && user) {
    console.log("Current User:", user);
  }

  const profileImage =
    !loading && user && user.get("profileImage")
      ? user.get("profileImage").url()
      : "https://via.placeholder.com/40";


  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file)); // Preview the file locally
    }
  };

  const createPost = async () => {
    if (!text) {
      alert("Post text cannot be empty!");
      return;
    }


  let Post = new Parse.Object('POSTS');
  if (mediaFile) {
    const media = new Parse.File(mediaFile.name, mediaFile);
    await media.save();
    Post.set("media", media);
    console.log("Media file uploaded successfully: " + media.url());
  }
	Post.set("postedBy", user);
	Post.set('text', text);
	Post.set('dateofPosting', new Date());
	Post.set('numberOfLikes', 0);
	Post.set('numberOfComments', 0);
  //Post.set("comments", []);
	
	try {
		Post.save();
		alert('Success! Post created!');
		readPosts();
		return true;
	} catch (error) {
		alert('Ups! ${error.message}');
		return false;
	};
};


  return (
    <>
      <Header>
        <UserImage src={profileImage} alt="User Profile Image" />
        <TextField
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing here..."
        />
      </Header>
      <Actions>
        <LeftActions>
          {mediaPreview && <ImagePreview src={mediaPreview} alt="Preview" />}
          <UploadButton>
            <i className="bi bi-upload" />
            Upload Media Files
            <input
              type="file"
              onChange={handleMediaUpload}
              style={{ display: "none" }}
            />
          </UploadButton>
        </LeftActions>
        <RightActions>
          <Button className="primary-button" type="button" onClick={createPost}>
            Create Post
          </Button>
        </RightActions>
      </Actions>
    </>
  );
};



// Styled Components

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-items: flex-start;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const TextField = styled.textarea`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  color: #333;
  background-color: #f9f9f9;
  resize: vertical;
  min-height: 80px;
  max-height: 300px;
  overflow-y: auto;

  &::placeholder {
    color: #aaa;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 15px;
`;

const LeftActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px
`;

const RightActions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const UploadButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #34415d;
  cursor: pointer;
  margin-left: 50px;

  i {
    font-size: 18px;
  }

  &:hover {
    color: #e47347;
  }
`;

export default PostingContainer;
