import { ReactElement } from "react";
import { CartProvider, UserProvider, SnackBarProvider } from "./context";

const AppProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <SnackBarProvider>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </SnackBarProvider>
  );
};

export default AppProvider;
