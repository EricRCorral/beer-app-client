export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
};
