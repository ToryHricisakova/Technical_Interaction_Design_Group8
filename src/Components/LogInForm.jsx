import React, { useState } from "react";
import Button from "./Button";
import CloseIcon from "./CloseIcon";
import { Link } from "react-router-dom";
import HorizontalLine from "./HorizontalLine";
import { useNavigate } from "react-router-dom";
import {
  BasicContainer,
  Title,
  FormContent,
  InputContainer,
  StyledInput,
  StyledLabel,
} from "../SharedCSS";
import Parse from "parse";
import styled from "styled-components";

/**
 * A form for logging registered users in with e-mail as their username and their chosen password.
 * Parse is used to handle the log in functionality.
 *
 * If incorrect login information is entered, an error message is displayed.
 */
const LogInForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async function (e) {
    e.preventDefault();
    const usernameValue = username.toLowerCase();
    const passwordValue = password;

    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      console.log("Logged in as " + loggedInUser.get(username));
      const currentUser = await Parse.User.currentAsync();
      console.log(
        "Is logged in user equal to currentUser?" +
          (loggedInUser === currentUser)
      );
      setIsLoggedIn(true);
      navigate("/profile");
      return true;
    } catch (error) {
      setErrorMsg("Incorrect username or password");
      return false;
    }
  };

  return (
    <BasicContainer>
      <Link to="/">
        <CloseIcon />
      </Link>
      <Title>Welcome Back</Title>
      <HorizontalLine width="100%" />

      <FormContent>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <InputContainer>
            <StyledLabel htmlFor="email">E-mail</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            {console.log(username)}
          </InputContainer>

          <InputContainer>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <p>
              <u>Forgot password?</u>
            </p>
          </InputContainer>

          {/* Primary Button */}
          <Button className="primary-button" type="submit">
            Log In
          </Button>
        </form>
      </FormContent>
    </BasicContainer>
  );
};

export default LogInForm;

// style
const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-bottom: 15px;
  padding: 5px;
`;
