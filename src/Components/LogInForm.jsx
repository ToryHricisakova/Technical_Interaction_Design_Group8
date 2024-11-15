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

// getCurrentUser and handleLogin inspired by back4app tutorials.

const LogInForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async function (e) {
    e.preventDefault();
    const usernameValue = username;
    const passwordValue = password;

    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      console.log("Logged in as " + loggedInUser.get(username));
      const currentUser = await Parse.User.currentAsync();
      console.log(
        "Is logged in user equal to currentUser?" +
          (loggedInUser === currentUser)
      );
      //getCurrentUser(); // superfluous?
      navigate("/profile");
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  // const handleLogin = (e) => {
  // e.preventDefault();
  // alert(`Logging in...`);
  // setIsLoggedIn(true);
  // navigate("/home");
  // };

  return (
    <BasicContainer>
      <Link to="/">
        <CloseIcon />
      </Link>
      <Title>Welcome Back</Title>
      <HorizontalLine width="100%" />

      <FormContent>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <InputContainer>
            <StyledLabel htmlFor="email">E-mail</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
