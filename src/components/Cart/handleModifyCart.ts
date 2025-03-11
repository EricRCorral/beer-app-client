import { CartItem } from "../../types/Cart";
import { User } from "../../types/User";

const handleModifyCart = async (
  user: User,
  cart: Omit<CartItem, "id">[],
  setCart: (cart: Omit<CartItem, "id">[]) => void,
  beerId: number,
  quantity: number
) => {
  if (!user) {
    location.assign("/sesion");
    return;
  }

  const {
    name,
    price,
    image,
    quantity: currentQuantity,
  } = cart.find(({ beer_id }) => beer_id === beerId)!;

  const NEW_QUANTITY = currentQuantity + quantity;

  try {
    await fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
        beerId,
        name,
        price,
        image,
        quantity: NEW_QUANTITY,
      }),
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const CART = await (
      await fetch(`http://localhost:3000/cart/${user.id}`)
    ).json();

    setCart(CART);

    return {
      ok: true,
      message: `Ahora tienes ${NEW_QUANTITY} ${name} en tu carrito`,
    };
  } catch (error) {
    console.log(error);

    return { ok: false, message: String(error) };
  }
};

export default handleModifyCart;
