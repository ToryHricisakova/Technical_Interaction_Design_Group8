import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parse from "parse";

const LikeIcon = ({ objectId, initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const updateLikes = async (newLikesCount) => {
    try {
      // Fetch the post from the database
      const Post = Parse.Object.extend("POSTS");
      const query = new Parse.Query(Post);
      const post = await query.get(objectId);

      // Update the likes count field
      post.set("numberOfLikes", newLikesCount);

      // Save the post object with the new number of likes
      await post.save();
      console.log("Post likes updated successfully");
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    const newLikesCount = newLikedState ? likes + 1 : likes - 1;
    setLikes(newLikesCount);

    updateLikes(newLikesCount);
  };

  useEffect(() => {
    // Optionally, fetch the current like state from the backend when the component mounts.
    // Here you would fetch the current "liked" status of the user, if necessary.
  }, []);

  return (
    <LikeContainer onClick={handleLike}>
      <i
        className={`bi ${
          liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"
        }`}
      />
      <LikeCount>{likes}</LikeCount>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #34415d;
  transition: color 0.3s ease;

  &:hover {
    color: #e47347;
  }
`;

const LikeCount = styled.span`
  font-size: 14px;
  color: inherit;
`;

export default LikeIcon;
