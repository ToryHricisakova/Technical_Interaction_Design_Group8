import React from 'react';
import RegistrationForm from '../Components/RegistrationForm';
import { PageWithImage } from '../SharedCSS';

const Registration = () => {
  return (
    <PageWithImage>
      <RegistrationForm />
      {/* <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} />
            </Routes>
          
        </Router>
      */}
    </PageWithImage>
  );
};

export default Registration;