import { ReactElement } from "react";
import { CartProvider } from "./context/Cart";
import { AuthProvider } from "./context/Auth";

const AppProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default AppProvider;
