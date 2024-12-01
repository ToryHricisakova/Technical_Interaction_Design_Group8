import { useState, useEffect, React } from "react";
import styled from "styled-components";
import Post from "../Components/Post";
import PostingContainer from "../Components/PostingContainer";
import ExpandNetworkBox from "../Components/ExpandNetworkBox";
import Parse from "parse";

const Home = () => {
  const [POSTS, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const readPosts = async () => {
    const parseQuery = new Parse.Query("POSTS");
    parseQuery.include("postedBy");
    parseQuery.descending("dateofPosting");
    
    try {
      const fetchedPosts = await parseQuery.find();
      const postsData = fetchedPosts.map((post) => {
        const user = post.get("postedBy");
        const profileImage = user
          ? user.get("profileImage")?.url()
          : "https://via.placeholder.com/40";
        const name = user
          ? `${user.get("firstName")} ${user.get("lastName")}`
          : "Anonymous";
        const fields = user 
          ? user.get("fields") 
          : [];
        const text = post.get("text");
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
          fields: fields,
          dateofPosting: dateofPosting,
          numberOfLikes: numberOfLikes,
        };
      });

      setPosts(postsData);

    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    readPosts();
  }, []);


  return (
    <HomePage>
      <MainSection>
        <Container>
          <PostingContainer></PostingContainer>
        </Container>
        <Container>
          {loading ? (
            <p>Loading posts...</p>
          ) : POSTS.length > 0 ? (
            POSTS.map((post, index) => {
              return (
                <Post
                  objectId={post.objectId}
                  key={index}
                  profileImage={post.profileImage}
                  name={post.name}
                  text={post.text}
                  fields={post.fields}
                  dateofPosting={post.dateofPosting}
                  numberOfLikes={post.numberOfLikes}
                />
              );
            })
          ) : (
            <p>No posts available</p>
          )}
        </Container>
      </MainSection>

      <ExpandNetworkBox />
    </HomePage>
  );
};

// Styled Components

const HomePage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 150px;
  gap: 30px;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  position: relative;
  width: 800px;
  padding: 30px;
  display: flex;
  background-color: #ffffff;

  border-radius: 20px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
`;

export default Home;
