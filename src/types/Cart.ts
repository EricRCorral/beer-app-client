export type CartItem = {
  id: number;
  user_id: string;
  beer_id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  setCart: (cart: Omit<CartItem, "id">[]) => void;
};
