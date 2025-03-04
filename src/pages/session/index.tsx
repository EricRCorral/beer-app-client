import { useContext, useEffect, useState } from "react";
import { Button, Text, Input, Loader } from "../../components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

import "./session.css";

const Session: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [{ username, password }, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await (
      await fetch(
        `http://localhost:3000/auth/${isLogin ? "signin" : "register"}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      )
    ).json();

    if (data.error) {
      setError(data.error);
      return;
    }

    setError("");

    navigate("/");
  };

  const handleFormValue = (key: "username" | "password", value: string) =>
    setFormValues((prev) => ({ ...prev, [key]: value }));

  const handleIsLogin = () => setIsLogin((prev) => !prev);

  useEffect(() => {
    if (auth) navigate("/");
  }, [auth, navigate]);

  if (loading)
    return (
      <div className="session-loader">
        <Loader />
      </div>
    );

  return (
    <div className="session">
      <form onSubmit={handleSubmit}>
        <Text tag="h2">{isLogin ? "Inicio de sesión" : "Registro"}</Text>
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
        <Button>{isLogin ? "Iniciar sesión" : "Registrarse"}</Button>
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
