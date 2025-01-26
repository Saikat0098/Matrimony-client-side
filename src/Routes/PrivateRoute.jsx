import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

 

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
