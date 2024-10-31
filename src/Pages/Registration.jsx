import React from 'react';

const Registration = () => {
  return (
    <div>
      <Router>
            
            <Welcomebar />
            <Routes>
              <Route path="/home" element={<Welcomebar />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} /> */}
            </Routes>
          
        </Router>
    </div>
  );
};

export default Registration;