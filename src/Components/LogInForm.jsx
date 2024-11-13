import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
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

const LogInForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in...`);
    setIsLoggedIn(true);
    navigate("/home");
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
          <PrimaryButton type="submit">Log In</PrimaryButton>
        </form>
      </FormContent>
    </BasicContainer>
  );
};

export default LogInForm;
