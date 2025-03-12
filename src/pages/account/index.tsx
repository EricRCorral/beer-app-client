import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { SelectBar, Text } from "../../components";
import { User } from "../../types/User";

import "./account.css";

interface AccountProps {
  loadingUser: boolean;
  session: User | false;
}

const Account: React.FC<AccountProps> = ({ loadingUser, session }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const LAST_PATH = pathname.split("/")[pathname.split("/").length - 1];

  const { user } = useContext(UserContext);

  const handleNavigate = (path: string) => navigate(path);

  useEffect(() => {
    if (!loadingUser && !session && !user) navigate("/sesion");
  }, [user, navigate, session, loadingUser]);

  return (
    <div className="account">
      <Text tag="h1">Hola {user?.username}</Text>
      <Text>
        En este espacio podras ver tu lista de favoritos e historial de compras
      </Text>
      <SelectBar
        handleSelect={handleNavigate}
        values={["Favoritos", "Historial"]}
        active={LAST_PATH}
      />
      <Outlet />
    </div>
  );
};

export default Account;
