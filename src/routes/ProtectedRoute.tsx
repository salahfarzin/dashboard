import type { RootState } from 'src/store'

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

// A ProtectedRoute component that checks if the user is authenticated
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.userToken); // Assuming token is stored in the state
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to sign-in page if not authenticated and preserve the location they came from
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute