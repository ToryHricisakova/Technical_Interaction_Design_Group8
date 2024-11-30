import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import useUserProfile from "../Hooks/useUserProfile";

const PostingContainer = () => {
  const [user, loading] = useUserProfile();
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  if (!loading && user) {
    console.log("Current User:", user);
  }

  //const firstName = user.get("firstName");
  //const lastName = user.get("lastName");
  //const fields = user.get("fields");

  //const postedBy = `${firstName} ${lastName}`;

  const profileImage =
    !loading && user && user.get("profileImage")
      ? user.get("profileImage").url()
      : "https://via.placeholder.com/40";

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const createPost = async () => {
    if (!text) {
      alert("Post text cannot be empty!");
      return;
    }

  let Post = new Parse.Object('POSTS');
	Post.set("postedBy", postedBy);
	Post.set("tags", fields);
	Post.set('text', text);
	Post.set('media', file);
	Post.set('dateofPosting', new Date());
	Post.set('likes', 0);
	Post.set('comments', 0);
	
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
          <UploadButton>
            <i className="bi bi-upload" />
            Upload Media Files
            <input
              type="file"
              onChange={handleFileChange}
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
