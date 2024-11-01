import { faCheck, faTimes, faInfoCircle, fa0, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Registration.css';
import { useState, useEffect } from "react";
import HorizontalLine from "./HorizontalLine";
import PrimaryButton from "./PrimaryButton";

const Registration = () => {

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // A simple check, e-mail might still not be valid.
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?&_.,:;"'~=+-/|\\{}()^\[\]]).{8,24}$/; // Password requirements:
                                                                                                                // between 8-24 characters and includes:
                                                                                                                // a lowercase letter
                                                                                                                // an uppercase letter
                                                                                                                // a number
                                                                                                                // a special character.

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const [users, setUsers] = useState([]);

    const handleRegister = (e) => {
        e.preventDefault();
        if (!validEmail || !validPassword || !passwordMatch || !termsAccepted) {
            setErrorMsg("Please fill out all fields correctly.");
            return;
        }
        setErrorMsg('');

        // Handle form submission - needs to be implemented with backend.
        {console.log(firstName)}
        {console.log(lastName)}
        const newUser = {firstName: firstName, lastName: lastName, email: email, password: password}

        setUsers((prevUsers) => [...prevUsers, newUser]);

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setValidEmail(EMAIL_REGEX.test(e.target.value));
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setValidPassword(PASSWORD_REGEX.test(e.target.value));
    }

    const handlePasswordConfirmation = (e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value === password) setPasswordMatch(true);
    }

    // useEffects added for troubleshooting.
    useEffect(() => {
        console.log("password =", password);
    }, [password]);

    useEffect(() => {
        console.log("password valid?", validPassword);
    }, [validPassword]);

    // Print full user array whenever it is updated.
    useEffect(() => {
        console.log(users);
    }, [users]);

    return ( 
        <div className="Registration">
            <h1>Registration</h1>
            <HorizontalLine width="320px"/>

            <div className="formContent">
                
            {/* Error Message */}
            {errorMsg && <p className="error-message">{errorMsg}</p>}

                <form onSubmit={handleRegister}> {/*How to turn off autocomplete?*/}

                    <div className="input-container">
                        <label htmlFor="firstName">First name:{firstName !== '' ? (
                            <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: "8px" }} />
                            ) : (
                            <FontAwesomeIcon icon={faTimes} style={{ color: "red", marginLeft: "8px" }} />
                        )}</label>
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
                        <label htmlFor="lastName">Last name:{lastName !== '' ? (
                            <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: "8px" }} />
                            ) : (
                            <FontAwesomeIcon icon={faTimes} style={{ color: "red", marginLeft: "8px" }} />
                        )}</label>
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
                        <label htmlFor="email">E-mail:{validEmail ? (
                            <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: "8px" }} />
                            ) : (
                            <FontAwesomeIcon icon={faTimes} style={{ color: "red", marginLeft: "8px" }} />
                        )}</label>
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
                        <label htmlFor="password">Password:
                            <FontAwesomeIcon icon={faInfoCircle} title="Password has to be between 8 and 24 characters and contain at least one lowercase letter, one uppercase letter, a number, and a special character" style={{ color: "grey", marginLeft: "8px" }} />
                            {validPassword ? (
                            <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: "8px" }} />
                            ) : (
                            <FontAwesomeIcon icon={faTimes} style={{ color: "red", marginLeft: "8px" }} />
                        )}</label>
                        <input
                            type="text"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="confirmPassword">Confirm password:{(passwordMatch) ? (
                            <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: "8px" }} />
                            ) : (
                            <FontAwesomeIcon icon={faTimes} style={{ color: "red", marginLeft: "8px" }} />
                        )}</label>
                        <input
                            type="text"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder="Re-enter password"
                            onChange={handlePasswordConfirmation}
                            required
                        />
                    </div>

                    <div className="terms-container">
                        <input className="checkBox"
                            type="checkbox"
                            id="terms"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                            required
                        />
                        <label className="checkboxLabel" htmlFor="terms">I agree to the terms and conditions as set out by the user agreement.</label>
                    </div>
                    
                    <PrimaryButton type="submit">Register</PrimaryButton>
                    
                </form>
            </div>

            {/* Display users in JSON format on page */}
            {/* <h2>Registered Users</h2>
            <pre>{JSON.stringify(users, null, 2)}</pre>  */}
        
        </div>
        
     );
    
}
 
export default Registration;