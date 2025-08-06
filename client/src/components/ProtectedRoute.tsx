import type { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface props {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: props) => {
  const { isError, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isError) navigate("/login");

  if(isLoading) return <>Loading....</>
  return <>{children}</>;
};

export default ProtectedRoute;
