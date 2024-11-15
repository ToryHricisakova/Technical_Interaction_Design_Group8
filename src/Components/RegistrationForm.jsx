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
} from "../SharedCSS";
import styled from "styled-components";

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

  const [users, setUsers] = useState([]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validEmail || !validPassword || !passwordMatch || !termsAccepted) {
      setErrorMsg("Please fill out all fields correctly.");
      return;
    }
    setErrorMsg("");

    // Handle form submission - needs to be implemented with backend.
    {
      console.log(firstName);
    }
    {
      console.log(lastName);
    }
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/onboarding1");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidEmail(EMAIL_REGEX.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    console.log("password change: " + e);
    setPassword(e.target.value);
    setValidPassword(PASSWORD_REGEX.test(e.target.value));
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handlePasswordConfirmation = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const togglePasswordVisibility = (e) => {
    setHidePassword(!hidePassword);
  };

  const togglePasswordVisibility2 = (e) => {
    setHidePassword2(!hidePassword2);
  };

  // useEffects added for troubleshooting.
  useEffect(() => {
    console.log("password =", password);
  }, [password]);

  useEffect(() => {
    console.log("password valid?", validPassword);
  }, [validPassword]);

  useEffect(() => {
    console.log("confirmPassword = ", confirmPassword);
  }, [confirmPassword]);

  useEffect(() => {
    console.log("passwordMatch = ", passwordMatch);
  }, [passwordMatch]);

  // Print full user array whenever it is updated.
  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <BasicContainer>
      <Link to="/">
        <CloseIcon />
      </Link>
      <Title>Registration</Title>
      <HorizontalLine width="100%" />

      <FormContent>
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          {/* Error Message */}
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}{" "}
          {/*We need to turn off autocomplete in all fields*/}
          <InputContainer>
            <StyledLabel htmlFor="firstName">
              First name
              {firstName !== "" ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "green", marginLeft: "8px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "red", marginLeft: "8px" }}
                />
              )}
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
              {lastName !== "" ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "green", marginLeft: "8px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "red", marginLeft: "8px" }}
                />
              )}
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
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "green", marginLeft: "8px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "red", marginLeft: "8px" }}
                />
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
              {/* <FontAwesomeIcon
                icon={faInfoCircle}
                title="Password has to be between 8 and 24 characters and contain at least one lowercase letter, one uppercase letter, a number, and a special character"
                style={{ color: "grey", marginLeft: "8px" }}
              /> */}
              {validPassword ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "green", marginLeft: "8px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "red", marginLeft: "8px" }}
                />
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
                onClick={togglePasswordVisibility} // Clicking toggles visibility of password
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
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "green", marginLeft: "8px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "red", marginLeft: "8px" }}
                />
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
                onClick={togglePasswordVisibility2} // Clicking toggles visibility of password
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

      {/* Display users in JSON format on page */}
      {/* <h2>Registered Users</h2>
            <pre>{JSON.stringify(users, null, 2)}</pre>  */}
    </BasicContainer>
  );
};

export default RegistrationForm;

// Styling:
const TermsContainer = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  width: 100%; /* Match the form width */
  margin: 12px 0 20px 0;
`;
const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-bottom: 15px;
  padding: 5px;
`;
const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  align-items: center;
`;
const CheckboxLabel = styled.label`
  font-size: small;
  text-align: left;
`;
const PasswordWrapper = styled.div`
  width: 100%;
  position: relative; /* Positions the icon inside the input field instead of outside */
`;
const ToggleVisibilityEye = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0px; /* Positions the icon to the right inside the input field */
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
