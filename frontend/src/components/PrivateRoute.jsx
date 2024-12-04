import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { verifyUser } from "../utils/apiUtil"; // Import the verifyUser function

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state to handle loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await verifyUser();
        setIsAuthenticated(response.data.success); // Set auth state based on token validation
      } catch (error) {
        console.error("Token verification failed", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication(); // Check authentication on mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking the token
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Render child routes if authenticated
};

export default PrivateRoute;
