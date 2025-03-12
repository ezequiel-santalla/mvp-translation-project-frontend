import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem("token");
  const location = useLocation();

  const allowedPaths = ["/forgot-password"]; // Rutas accesibles sin autenticación

  return isAuthenticated || allowedPaths.includes(location.pathname) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
