import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface props {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: props) => {
  const { isLoggedIn, isVerifying } = useAuthContext();
  if (isVerifying) return <>Loading...</>;

  if (!isLoggedIn) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
