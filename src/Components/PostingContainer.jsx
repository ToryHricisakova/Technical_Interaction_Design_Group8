import React, { useState } from "react";
import styled from "styled-components";

const PostingContainer = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

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

    let Post = new Parse.Object('Post');
	Post.set('postedBy');
	Post.set('tags');
	Post.set('text', text);
	Post.set('media', file);
	Post.set('dateOfPosting', new Date());
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
        <UserImage
            src="https://via.placeholder.com/40"
            alt="User Profile" />
        <TextField placeholder="Start typing here..." />
      </Header>
      <Actions>
        <UploadButton>
            <i className="bi bi-upload" />
            Upload Media Files
        </UploadButton>
        <Button className="primary-button" type="submit">
            Log In
        </Button>
      </Actions>
    </>
  );
};





// Styled Components

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const TextField = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  color: #333;
  background-color: #f9f9f9;

  &::placeholder {
    color: #aaa;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const UploadButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #34415d;
  cursor: pointer;

  i {
    font-size: 18px;
  }

  &:hover {
    color: #e47347;
  }
`;

export default PostingContainer;
