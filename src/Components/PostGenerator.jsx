import Post from "./Post";
import { useEffect, useState } from "react";

/**
 * Component for generating post-objects based on an array of posts database objects.
 * The "variant" prop designates whether it is a default post or a small post (for display on the profile page).
 */
const PostGenerator = ({ array, variant }) => {
  const [posts, setPosts] = useState([]);
  const fetchedPosts = array;

  useEffect(() => {
    if (!fetchedPosts || fetchedPosts.length === 0) {
      return;
    }

    const createPosts = async () => {
      try {
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
              variant={variant}
            />
          );
        })
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
};

export default PostGenerator;
