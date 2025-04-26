import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.rol.nombreUsuario.toLowerCase())) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
