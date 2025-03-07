import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext, UserContext } from "../../context";
import { Button, Text } from "../";
import { FaCaretDown, FaCaretUp, FaTrash } from "react-icons/fa6";
import handleModifyCart from "./handleModifyCart";

import "./cart.css";

interface CartProps {
  hidden: boolean;
  handleCartVisibility: () => void;
}

const Cart: React.FC<CartProps> = ({ hidden, handleCartVisibility }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getCart = async () => {
    const cart = await (
      await fetch(`http://localhost:3000/cart/${user?.id}`)
    ).json();

    setCart(cart);
  };

  const handleNavigate = (url: string) => {
    handleCartVisibility();
    navigate(url);
  };

  const handleCart = (beer_id: number, quantity: number) =>
    handleModifyCart(user, cart, setCart, beer_id, quantity);

  const handleCartRemove = async (beerId: number) => {
    const resp = await fetch(`http://localhost:3000/cart/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
        beerId,
      }),
    });

    if (resp.status === 204) getCart();

    setCart(cart);
  };

  const Content = () => {
    if (cart.length === 0)
      return (
        <div className="empty-cart">
          <Text tag="h1">Tu carrito esta vacio! Agrega cervezas 🍺</Text>
          <Button onClick={() => handleNavigate("/tienda")}>
            Ir a la tienda
          </Button>
          <Button onClick={handleCartVisibility}>Cerrar</Button>
        </div>
      );

    let total = 0;

    cart.forEach(({ price, quantity }) => (total += price * quantity));

    return (
      <>
        {cart.map(({ beer_id, image, name, price, quantity }) => (
          <div className="item" key={beer_id}>
            <img
              onClick={() => handleNavigate(`tienda/producto/${beer_id}`)}
              src={image}
            />
            <div>
              <Text
                onClick={() => handleNavigate(`tienda/producto/${beer_id}`)}
                tag="h3"
              >
                {name}
              </Text>
              <div>
                <Text>
                  {price} x {quantity}
                </Text>
                <div className="quantity-handlers">
                  <FaCaretUp onClick={() => handleCart(beer_id, 1)} />
                  <FaCaretDown
                    className={quantity <= 1 ? "disabled" : ""}
                    onClick={() => handleCart(beer_id, -1)}
                  />
                </div>
              </div>
              <Button onClick={() => handleCartRemove(beer_id)}>
                Quitar
                <FaTrash />
              </Button>
            </div>
          </div>
        ))}
        <Text tag="h2">Total: {total} $</Text>
        <Button onClick={() => handleNavigate("/checkout")}>Comprar</Button>
        <Button onClick={() => handleNavigate("/tienda")}>
          Ir a la tienda
        </Button>
        <Button onClick={handleCartVisibility}>Cerrar</Button>
      </>
    );
  };

  useEffect(() => {
    if (user?.id) getCart();

    const CART = document.querySelector(".cart");
    CART?.classList.add("initial");
    setTimeout(() => {
      CART?.classList.remove("initial");
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <>
      <div className={`cart${hidden ? " hidden" : ""}`}>
        <Content />
      </div>
    </>
  );
};

export default Cart;
