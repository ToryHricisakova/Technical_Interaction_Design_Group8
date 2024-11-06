import {
  faCheck,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Registration.css";
import { useState, useEffect } from "react";
import HorizontalLine from "./HorizontalLine";
import PrimaryButton from "./PrimaryButton";
import CloseIcon from "./CloseIcon";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // A simple check, e-mail might still not be valid.
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?&_.,:;"'~=+-/|\\{}()^\[\]]).{8,24}$/; // Password requirements:
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
  }

  const togglePasswordVisibility2 = (e) => {
    setHidePassword2(!hidePassword2);
  }


  // useEffects added for troubleshooting.
  useEffect(() => {
    console.log("password =", password);
  }, [password]);

  useEffect(() => {
    console.log("password valid?", validPassword);
  }, [validPassword]);
  
  useEffect(() => {
    console.log("confirmPassword = ", confirmPassword);
  }, [confirmPassword])

  useEffect(() => {
    console.log("passwordMatch = ", passwordMatch);
  }, [passwordMatch])

  // Print full user array whenever it is updated.
  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="RegistrationForm">
      <h1>Registration</h1>
      <Link to="/">
        <CloseIcon />
      </Link>
      <HorizontalLine width="100%" /> 

      <div className="formContent">
        {/* Error Message */}
        {errorMsg && <p className="error-message">{errorMsg}</p>}

        <form onSubmit={handleRegister}>
          {" "}
          {/*We need to turn off autocomplete in all fields*/}
          <div className="input-container">
            <label htmlFor="firstName">
              First name:
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
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName">
              Last name:
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
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">
              E-mail:
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
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter e-mail address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">
              Password:
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
            </label>
            <div className="passwordWrapper">
              <input
                type={hidePassword ? "password" : "text"}
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <FontAwesomeIcon
                icon={hidePassword ? faEyeSlash : faEye} // Icon changes when clicked.
                onClick={togglePasswordVisibility} // Clicking toggles visibility of password
                className="toggleVisibilityEye"
              />
            </div>
            <p className="req">Password must be between 8 and 24 characters and must contain at least one lowercase letter, one uppercase letter, a number, and a special character.</p>
          </div>
          <div className="input-container">
            <label htmlFor="confirmPassword">
              Confirm password:
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
            </label>
            <div className="passwordWrapper">
              <input
                type={hidePassword2 ? "password" : "text"}
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Re-enter password"
                onChange={handlePasswordConfirmation}
                required
              />
              <FontAwesomeIcon
                icon={hidePassword2 ? faEyeSlash : faEye} // Icon changes when clicked.
                onClick={togglePasswordVisibility2} // Clicking toggles visibility of password
                className="toggleVisibilityEye"
              />
            </div>
          </div>
          <div className="terms-container">
            <input
              className="checkBox"
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              required
            />
            <label className="checkboxLabel" htmlFor="terms">
              I agree to the terms and conditions as set out by the user
              agreement. {/*Should link to the user agreement.*/}
            </label>
          </div>
          <Link to="/onboarding1">
            <PrimaryButton type="submit">Register</PrimaryButton>
          </Link>
        </form>
      </div>

      {/* Display users in JSON format on page */}
      {/* <h2>Registered Users</h2>
            <pre>{JSON.stringify(users, null, 2)}</pre>  */}
    </div>
  );
};

export default RegistrationForm;
