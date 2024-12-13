import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "./Button";
import useUserProfile from "../Hooks/useUserProfile";
import Parse from "parse";

const PostingContainer = ({ refreshPosts }) => {
  const [user, loading] = useUserProfile();
  const [text, setText] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState("");
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);
  //const mediaPreviewRef = useRef(null);

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

  useEffect(() => {
    if (user && !loading) {
      const existingMedia = user.get("media")?.url();
      if (existingMedia) setMediaFile(existingMedia);
    }
  }, [user, loading]);

  const handleFileInput = () => fileInputRef.current?.click();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const media = new Parse.File(file.name, file);
      await media.save();

      if (user) {
        user.set("media", media);
        await user.save();
      }

      setMediaFile(media);
      setMediaPreview(URL.createObjectURL(file));
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    }
  };

  const removePreview = () => {
    setMediaFile(null);
    setMediaPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createPost = async () => {
    if (!text) {
      setMessage("Post text cannot be empty!");
      return;
    }

    let Post = new Parse.Object("POSTS");
    try {
      if (mediaFile instanceof Parse.File) {
        Post.set("media", mediaFile);
      }

      Post.set("text", text);
      Post.set("postedBy", user);
      Post.set("dateofPosting", new Date());
      Post.set("numberOfLikes", 0);
      Post.set("numberOfComments", 0);

      await Post.save();
      setMessage("Post created successfully!");

      refreshPosts();

      setText("");
      setMediaFile(null);
      setMediaPreview("");
    } catch (error) {
      setMessage(`Error creating post: ${error.message}`);
    }
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
        <FileUploadWrapper>
          {mediaPreview && (
            <PreviewWrapper>
              <PreviewImage src={mediaPreview} alt="Preview" />
              <RemoveButton onClick={removePreview}>
                <i className="bi bi-x-circle" />
              </RemoveButton>
            </PreviewWrapper>
          )}
          <HiddenFileInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <UploadButton onClick={handleFileInput}>
            <i className="bi bi-upload" />
            Upload Media
          </UploadButton>
        </FileUploadWrapper>
        <ButtonContainer>
          <Button className="primary-button" type="button" onClick={createPost}>
            Create Post
          </Button>
        </ButtonContainer>
      </Actions>
      {message && <MessageContainer>{message}</MessageContainer>}
    </>
  );
};



// Styled Components

const MessageContainer = styled.div`
  margin-top: 20px;
  color: #e47347;
  font-size: 16px;
  font-weight: bold;
  text-align: center;

  &.error {
    color: #e47347;
  }
`;

const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 100%;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 10px;
  margin-left: 50px;
`;

const RemoveButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20%;
  padding: 5px;
  cursor: pointer;
  color: #e47347;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 16px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  width: 50%;
`;

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HiddenFileInput = styled.input`
  display: none;
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
