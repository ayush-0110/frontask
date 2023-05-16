// import { Route, Navigate } from 'react-router-dom';
// import * as React from 'react';
// import { useAuth } from '../contexts/AuthContext';

// function ProtectedRoute({ element, ...rest }) {
//   const { isLoggedIn } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={isLoggedIn ? element : <Navigate to="/login" replace />}
//     />
//   );
// }

// export default ProtectedRoute;
import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  path: string;
  component: React.ElementType;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        {...rest}
        element={isLoggedIn ? <Component /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default ProtectedRoute;
