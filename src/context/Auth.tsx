import { createContext, ReactElement, useState } from "react";
import { Auth, AuthContextType } from "../types/Auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  auth: { id: "", username: "" },
  setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<Auth>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
