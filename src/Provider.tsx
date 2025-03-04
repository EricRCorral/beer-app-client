import { ReactElement } from "react";
import { CartProvider } from "./context/Cart";
import { UserProvider } from "./context/User";

const AppProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
};

export default AppProvider;
