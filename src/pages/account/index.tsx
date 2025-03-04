import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

const Account = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) navigate("/sesion");
  }, [auth, navigate]);

  return (
    <div>
      Account
      <Outlet />
    </div>
  );
};

export default Account;
