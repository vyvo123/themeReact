import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth, selectStatusLoggin } from "../../redux/authSlice";

const PrivateRouter = ({ children, page }) => {
  const isLogged = useSelector(selectStatusLoggin);
  const auth = useSelector(selectAuth);

  if (page === "admin") {
    if (!isLogged) {
      return <Navigate to="/login" />;
    } else if (!auth.user.role || !auth.user.active) {
      return <Navigate to="/" />;
    }
  } else {
    if (!isLogged || !auth.user.active) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default PrivateRouter;
