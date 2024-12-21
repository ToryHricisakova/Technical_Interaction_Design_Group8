import React, { useState } from "react";
import styled from "styled-components";
import Parse from "parse";

const LikeIcon = ({ objectId, initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  // Updates the number of likes for the specified post.
  const updateLikes = async (newLikesCount) => {
    try {
      // Fetching the post from the database
      const Post = Parse.Object.extend("POSTS");
      const query = new Parse.Query(Post);
      const post = await query.get(objectId);

      // Updating the likes count field
      post.set("numberOfLikes", newLikesCount);

      // Saving the post object with the new number of likes
      await post.save();
      console.log("Post likes updated successfully");
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  // Handles the toggle between a liked and unliked post. Only locally.
  const handleLike = () => {
    // Initializing and setting an unliked post.
    const newLikedState = !liked;
    setLiked(newLikedState);
    // If newLikedState is true, it increases the likes number, if a person unlikes it, the number decreases.
    const newLikesCount = newLikedState ? likes + 1 : likes - 1;
    setLikes(newLikesCount);

    updateLikes(newLikesCount);
  };

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
