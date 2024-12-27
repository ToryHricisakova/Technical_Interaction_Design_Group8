import { useState, useEffect, React } from "react";
import styled from "styled-components";
import PostGenerator from "../Components/PostGenerator.jsx";
import PostingContainer from "../Components/PostingContainer";
import ExpandNetworkBox from "../Components/ExpandNetworkBox";
import useUserProfile from "../Hooks/useUserProfile.js";
import Parse from "parse";
import "../Components/Spinner.css";

const Home = () => {
  const [user] = useUserProfile();
  const [loading, setLoading] = useState();
  const [displayPosts, setDisplayPosts] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState([]);

  // Reads all the posts for display
  useEffect(() => {
      const fetchPosts = async () => {
        const query = new Parse.Query("POSTS");
        query.descending("dateofPosting");
        query.include("postedBy");
  
        try {
          const result = await query.find();
          setFetchedPosts(result);
        } catch (error) {
          console.log("There was an error fetching the posts" + error.message);
        }
      };
      if (user) {
        fetchPosts();
      }
    }, [user]);

    useEffect(() => {
      createPosts();
    }, [fetchedPosts]);

    const createPosts = () => {
      if (fetchedPosts.length !== 0) {
        fetchedPosts && console.log("create post based on: " + fetchedPosts);

        setDisplayPosts(<PostGenerator array={fetchedPosts} variant="default" />);
      } else {
        setDisplayPosts([]);
      }
    };

  const refreshPosts = () => {
    setLoading(true);
    readPosts();
  };

  if (loading) return <span className="loader"></span>;

  return (
    <HomePage>
      <MainSection>
        <Container>
          <PostingContainer refreshPosts={refreshPosts}></PostingContainer>
        </Container>
        <Container>
          {displayPosts} {/* : <p> No posts available...</p> */}
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
