import {
  faCheck,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import HorizontalLine from "./HorizontalLine";
import Button from "./Button";
import CloseIcon from "./CloseIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  BasicContainer,
  Title,
  FormContent,
  StyledInput,
  InputContainer,
  StyledLabel,
  ErrorMessage,
} from "../SharedCSS";
import styled from "styled-components";
import Parse from "parse";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // A simple check, e-mail might still not be valid.
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?&_.,:;"'~=+-/|\\{}()^\[\]]).{8,24}$/;
  // Password requirements:
  // between 8-24 characters and includes:
  // a lowercase letter
  // an uppercase letter
  // a number
  // a special character.

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!validEmail || !validPassword || !passwordMatch || !termsAccepted) {
      setErrorMsg("Please fill out all fields correctly.");
      return;
    }

    // Check if a user is currently logged in and log them out if a session is active
    if (Parse.User.current()) {
      await Parse.User.logOut();
    }

    // Form submission is handled - implemented with backend.
    // Saving the user registration info to the "_User" table.
    const createdUser = await saveUser();
    if (createdUser === null) {
      setErrorMsg("An error occured during registration");
      return;
    }

    // Saving additional information to the "Users" table.
    const USERS = Parse.Object.extend("USERS");
    const user = new USERS();

    user.set("firstName", firstName);
    user.set("lastName", lastName);
    user.set("user", Parse.User.current()); // links the "_user" and "USERS" tables.

    // "save" creates the new object in the database.
    user.save().then(
      (newObj) => {
        console.log(
          "Saved with USERS id: " +
            newObj.id +
            " and _User id: " +
            createdUser.id
        );
        navigate("/onboarding1");
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  // Registrering user in "_User" table.
  const saveUser = async function () {
    const user = new Parse.User();

    user.set("username", email.toLowerCase());
    user.set("password", password);
    user.set("email", email);

    try {
      const createdUser = await user.signUp();
      console.log("User signed up with e-mail " + createdUser.getUsername());
      return createdUser;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidEmail(EMAIL_REGEX.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidPassword(PASSWORD_REGEX.test(e.target.value));
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handlePasswordConfirmation = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const togglePasswordVisibility = (setHidePassword, currentValue) => {
    setHidePassword(!currentValue);
  };

  return (
    <BasicContainer>
      <Link to="/">
        <CloseIcon />
      </Link>
      <Title>Registration</Title>
      <HorizontalLine width="100%" />

      <FormContent>
        <form onSubmit={handleRegistration} style={{ width: "100%" }}>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          {/*We need to turn off autocomplete in all fields*/}
          <InputContainer>
            <StyledLabel htmlFor="firstName">
              First name
              {firstName !== "" && <CheckmarkGreen icon={faCheck} />}
            </StyledLabel>
            <StyledInput
              type="text"
              id="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <StyledLabel htmlFor="lastName">
              Last name
              {lastName !== "" && <CheckmarkGreen icon={faCheck} />}
            </StyledLabel>
            <StyledInput
              type="text"
              id="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <StyledLabel htmlFor="email">
              E-mail
              {validEmail ? (
                <CheckmarkGreen icon={faCheck} />
              ) : (
                <CrossRed icon={faTimes} />
              )}
            </StyledLabel>
            <StyledInput
              type="text"
              id="email"
              placeholder="Enter e-mail address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <StyledLabel htmlFor="password">
              Password
              {validPassword ? (
                <CheckmarkGreen icon={faCheck} />
              ) : (
                <CrossRed icon={faTimes} />
              )}
            </StyledLabel>
            <PasswordWrapper>
              <StyledInput
                type={hidePassword ? "password" : "text"}
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <ToggleVisibilityEye
                icon={hidePassword ? faEye : faEyeSlash} // Icon changes when clicked.
                onClick={() =>
                  togglePasswordVisibility(setHidePassword, hidePassword)
                } // Clicking toggles visibility of password
              />
            </PasswordWrapper>
            <Req>
              Password must be between 8 and 24 characters and must contain at
              least one lowercase letter, one uppercase letter, a number, and a
              special character.
            </Req>
          </InputContainer>
          <InputContainer>
            <StyledLabel htmlFor="confirmPassword">
              Confirm password
              {passwordMatch ? (
                <CheckmarkGreen icon={faCheck} />
              ) : (
                <CrossRed icon={faTimes} />
              )}
            </StyledLabel>
            <PasswordWrapper>
              <StyledInput
                type={hidePassword2 ? "password" : "text"}
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Re-enter password"
                onChange={handlePasswordConfirmation}
                required
              />
              <ToggleVisibilityEye
                icon={hidePassword2 ? faEye : faEyeSlash} // Icon changes when clicked.
                onClick={() =>
                  togglePasswordVisibility(setHidePassword2, hidePassword2)
                } // Clicking toggles visibility of password
              />
            </PasswordWrapper>
          </InputContainer>
          <TermsContainer>
            <CheckBox
              className="checkBox"
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              required
            />
            <CheckboxLabel htmlFor="terms">
              I agree to the terms and conditions as set out by the user
              agreement. {/*Should link to the user agreement.*/}
            </CheckboxLabel>
          </TermsContainer>
          <Button className="primary-button" type="submit">
            Register
          </Button>
        </form>
      </FormContent>
    </BasicContainer>
  );
};

export default RegistrationForm;

// Styling:
const TermsContainer = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 12px 0 20px 0;
`;
const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  align-items: center;
`;
const CheckboxLabel = styled.label`
  font-size: 12px;
  text-align: left;
`;
const PasswordWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const ToggleVisibilityEye = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(
    -50%
  ); /* Position the eye icon vertically in the middle of the input field */
  cursor: pointer;
  color: #888;
`;
const Req = styled.p`
  font-size: x-small;
  text-align: left;
  margin-bottom: 0;
`;
const CheckmarkGreen = styled(FontAwesomeIcon)`
  color: green;
  margin-left: 8px;
`;
const CrossRed = styled(FontAwesomeIcon)`
  color: red;
  margin-left: 8px;
`;
