import { useState } from "react";
import { Button, Text, Input } from "../../components";

import "./session.css";

const Session = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleIsLogin = () => setIsLogin((prev) => !prev);

  const usernameError = "";
  const passwordError = "";
  const loginError = "";

  return (
    <div className="session">
      <form onSubmit={handleSubmit}>
        <Text tag="h2">{isLogin ? "Inicio de sesión" : "Registro"}</Text>
        <Text tag="label">Nombre de usuario</Text>
        <Input required type="text" />
        <Text className="error">{usernameError}</Text>
        <Text tag="label">Contraseña</Text>
        <Input required type="password" />
        <Text className="error">{passwordError}</Text>
        <Button>{isLogin ? "Iniciar sesión" : "Registrarse"}</Button>
        <Text className="error">{loginError}</Text>
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
