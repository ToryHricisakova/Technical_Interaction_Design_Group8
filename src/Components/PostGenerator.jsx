import Post from "./Post";
import { useEffect, useState } from "react";
import styled from "styled-components";

// Generates post-objects based on an array of posts database objects.
const PostGenerator = ({ array, style }) => {
  const [posts, setPosts] = useState([]);
  const fetchedPosts = array;

  useEffect(() => {
    if (!fetchedPosts || fetchedPosts.length === 0) {
      console.log("No data available for fetchedPosts yet.");
      return;
    }

    const createPosts = async () => {
      try {
        console.log("PostGenerator received array containing: " + fetchedPosts);
        const postsData = fetchedPosts.map((post) => {
          const user = post.get("postedBy");
          const profileImage = user.get("profileImage")?.url();
          const name = `${user.get("firstName")} ${user.get("lastName")}`;
          const fields = user ? user.get("fields") : [];
          const text = post.get("text");
          const media = post.get("media");
          const dateofPosting = post.get("dateofPosting");
          const numberOfLikes = post.get("numberOfLikes");
          const profileImageUser = user
            ? user.get("profileImage")?.url()
            : profileImage;

          return {
            objectId: post.id,
            profileImage: profileImageUser,
            name: name,
            text: text,
            media: media,
            fields: fields,
            dateofPosting: dateofPosting,
            numberOfLikes: numberOfLikes,
          };
        });

        setPosts(postsData);
        console.log("post data: " + postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    createPosts();
  }, []);

  return (
    <>
      {posts?.length > 0 ? (
        posts.map((post, index) => {
            console.log("Creating small posts");
            return (
              <Post
                objectId={post.objectId}
                key={index}
                profileImage={post.profileImage}
                name={post.name}
                text={post.text}
                media={post.media}
                fields={post.fields}
                dateofPosting={post.dateofPosting}
                numberOfLikes={post.numberOfLikes}
                variant="small"
              />
            );
          }
        )
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
};

export default PostGenerator;
