import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useAuth = (props) => {
  const currentUser = useSelector(({ user }) => user.currentUser);

  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
