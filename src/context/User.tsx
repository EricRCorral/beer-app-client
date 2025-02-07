import { createContext, ReactElement, useState } from "react";
import { User, UserContextType } from "../types/User";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType>({
  user: { email: "", id: "", name: "" },
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
