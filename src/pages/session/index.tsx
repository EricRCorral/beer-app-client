import { useContext, useEffect, useState } from "react";
import { Button, Text, Input, Loader } from "../../components";
import { useNavigate } from "react-router-dom";
import { SnackBarContext, UserContext } from "../../context";
import { HiHome } from "react-icons/hi";
import { API_URL } from "../../constants";

import "./session.css";

const Session: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [{ username, password }, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);
  const { setSnackBar } = useContext(SnackBarContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = await (
      await fetch(`${API_URL}user/${isLogin ? "signin" : "register"}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
    ).json();

    if (user.error) {
      setError(user.error);
      return;
    }

    setUser({ id: user.id, username: user.username, favs: [] });
    setError("");
    setSnackBar({
      message: isLogin
        ? "Inicio de sesión existoso"
        : "Ha registrado su cuenta exitosamente",
      color: "success",
    });

    navigate("/");
  };

  const handleFormValue = (key: "username" | "password", value: string) =>
    setFormValues((prev) => ({ ...prev, [key]: value }));

  const handleIsLogin = () => setIsLogin((prev) => !prev);

  const handleGoHome = () => navigate("/");

  useEffect(() => {
    if (user?.id) {
      navigate("/");
    } else {
      setSnackBar({
        message: "Debe iniciar sesión para continuar",
        color: "danger",
      });
    }
  }, [user, navigate, setSnackBar]);

  if (loading)
    return (
      <div className="session-loader">
        <Loader />
      </div>
    );

  return (
    <div className="session">
      <form onSubmit={handleSubmit}>
        <Text tag="h2">
          <Button type="button" onClick={handleGoHome} className="back">
            <HiHome />
          </Button>
          {isLogin ? "Inicio de sesión" : "Registro"}
        </Text>
        <Text tag="label">Nombre de usuario</Text>
        <Input
          onChange={({ target }) => handleFormValue("username", target.value)}
          required
          type="text"
        />
        <Text tag="label">Contraseña</Text>
        <Input
          onChange={({ target }) => handleFormValue("password", target.value)}
          required
          type="password"
        />
        <Button type="submit">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </Button>
        <Text className="error">{error}</Text>
        <div>
          <Text tag="small" onClick={handleIsLogin}>
            {isLogin
              ? "¿No tienes una cuenta? Crear una"
              : "¿Ya tienes una cuenta? Inicia sesión"}
          </Text>
        </div>
      </form>
    </div>
  );
};

export default Session;
