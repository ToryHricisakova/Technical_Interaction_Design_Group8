import styled from "styled-components";
import backgroundImage from "./MediaFiles/FrontpageBackground.jpg";

// Container for everything but the navbar:
export const Page = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 76px;
  min-height: 100vh;
`;
// Container for pages with the background image
export const PageWithImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  position: relative;
  padding-top: 76px;
  min-height: calc(
    100vh - 76px
  ); // Subtracts the padding-top from the min-height to avoid vertical scrolling.
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;
// Container for our basic white box with rounded edges.
export const BasicContainer = styled.div`
  padding: 32px 48px;
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
  font-size: 40px;
  margin-bottom: 10px;
  color: #35415d;
  font-family: Inter, sans-serif;
  line-height: 1.1;
`;
// Used for LogInForm and RegistrationForm
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  gap: 15px;
`;
// Used for LogInForm and RegistrationForm
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 95%;
  margin: 15px 0;
`;
// Used for LogInForm and RegistrationForm
export const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  color: #3a3a3a;
`;
// Used for LogInForm and RegistrationForm
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
// Used for LogInForm, RegistrationForm, ProfileHeader, TypeAhead,
export const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  padding: 5px;
  font-size: 14px;
`;
