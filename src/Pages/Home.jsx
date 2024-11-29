import React from "react";
import styled from "styled-components";
import Post from "../Components/Post";
import PostingContainer from "../Components/PostingContainer";

{/* The home page is static for now as we are trying to figure out how
  to fetch post data from the backend.*/}


const Home = () => {
  return (
    <HomePage>
      <MainSection>
        <Container>
          <PostingContainer></PostingContainer>
        </Container>
        <Container>
          <Post
            profileImage="path_to_image.jpg"
            name="Kate Hudson"
            profession="Software Engineer"
            text="I had my first job interview in IT today, and it was an eye-opening experience! Coming from a different background, I wasn’t sure how well my skills would translate, but I was pleasantly surprised. The interview focused on problem-solving, adaptability, and logical thinking—areas where my legal experience really helped me shine. There were definitely some technical questions that pushed me, but I’m excited about the challenge. It’s a big shift, but today’s interview made me feel like I’m heading in the right direction. Fingers crossed!" />
          <Post
            profileImage="path_to_image.jpg"
            name="Kate Hudson"
            profession="Software Engineer"
            text="I had my first job interview in IT today, and it was an eye-opening experience! Coming from a different background, I wasn’t sure how well my skills would translate, but I was pleasantly surprised. The interview focused on problem-solving, adaptability, and logical thinking—areas where my legal experience really helped me shine. There were definitely some technical questions that pushed me, but I’m excited about the challenge. It’s a big shift, but today’s interview made me feel like I’m heading in the right direction. Fingers crossed!" />
        </Container>
      </MainSection>

      <SideContainer>
       
          <h3>Connect Container</h3>
          <p>For future use</p>
    
      </SideContainer>
    </HomePage>
  );
};

// Styled Components

const HomePage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  width: 100vw;
  position: relative;
  padding: 100px 0 20px 0;
  min-height: 100vh;
  overflow-x: hidden;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  gap: 15px;
  width: 600px;
`;

const Container = styled.div`
  width: 600px;
  margin-bottom: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  gap: 15px;
  border-radius: 10px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
`;

const SideContainer = styled.div`
  width: 300px;
  margin-left: 75px;
  margin-right: 200px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: auto;
`;

export default Home;
