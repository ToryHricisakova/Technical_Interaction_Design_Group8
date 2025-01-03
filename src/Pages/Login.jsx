import React from 'react';
import LogInForm from '../Components/LogInForm';
import { PageWithImage } from "../Components/SharedCSS";

const Login = ({ setIsLoggedIn }) => {
  
    return (
        <PageWithImage>
            <LogInForm setIsLoggedIn={setIsLoggedIn} />
        </PageWithImage>
    );
};

export default Login;