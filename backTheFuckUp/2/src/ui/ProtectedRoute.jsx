SpinnerMain;
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import SpinnerMain from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  console.log(isAuthenticated);

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },

    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) return <SpinnerMain />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
