import styled from "styled-components";
import backgroundImage from "./MediaFiles/FrontpageBackground.png";

// Container for everything but the navbar:
export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  position: relative;
  padding: 76px 0 20px 0;
  min-height: 100vh;
  overflow-x: hidden;
`;
export const PageWithImage = styled(Page)`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;
export const BasicContainer = styled.div`
  padding: 2rem 3rem;
  border-radius: 40px;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  //border: 2px solid black;
`;

export const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
`;
