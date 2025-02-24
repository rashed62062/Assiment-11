import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Shimmer full-screen loading effect
  if (loading) {
    return (
      <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md animate-pulse space-y-4">
          {/* Large Placeholder Blocks */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-4/5 mx-auto"></div>
        </div>
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // Render the children if the user is authenticated
  if (user) {
    return children;
  }

  // Redirect to the login page if not authenticated
  return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
