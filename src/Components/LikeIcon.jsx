import React, { useState } from "react";
import styled from "styled-components";

const LikeIcon = () => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    return (
        <LikeContainer onClick={handleLike}>
            <i className={`bi ${liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}`} />
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