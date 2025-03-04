import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

const Account = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigate("/sesion");
  }, [user, navigate]);

  return (
    <div>
      Account
      <Outlet />
    </div>
  );
};

export default Account;
