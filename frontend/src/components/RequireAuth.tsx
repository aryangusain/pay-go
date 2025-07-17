import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "../store";

export default function RequireAuth() {
  const user = useSelector((state: RootState) => state.user.firstName);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
