import { Navigate } from "react-router-dom";
import { UserContext } from "../context/context.js";
import { useContext } from "react";

function PublicRoute({children}) {

    const {user} = useContext(UserContext);
      if (user) {
    return <Navigate to="/chat" replace />;
  }
  return children;
}

export default PublicRoute;