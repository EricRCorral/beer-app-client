import { createContext, ReactElement, useState } from "react";
import { CartContextType, CartItem } from "../types/Cart";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

export const CartProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
