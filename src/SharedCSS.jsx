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
// Container for pages with the background image
export const PageWithImage = styled(Page)`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;
// Container for our basic white box with rounded edges.
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
`;
// Title on login and registration page.
export const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
`;
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  gap: 15px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Ensures items are left-aligned */
  width: 95%;
  margin: 15px 0;
`;
export const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  color: #3a3a3a;
`;
export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  color: #000000;
  box-shadow: none;
  border-style: solid;
  border-color: #838383;
  border-width: 1px;
  background-color: white;
`;
