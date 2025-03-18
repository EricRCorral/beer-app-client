import { useContext, useEffect, useState } from "react";
import { Loader, Text } from "../../components";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { CartContext, UserContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

import "./checkout.css";

interface CheckoutProps {
  loadingUser: boolean;
  session: User | false;
}

const Checkout: React.FC<CheckoutProps> = ({ loadingUser, session }) => {
  const [preferenceId, setPreferenceId] = useState(null);

  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const handleInitMP = async () => {
    initMercadoPago(import.meta.env.VITE_PUBLIC_KEY_MP);

    const { id } = await (
      await fetch(
        "https://mature-halibut-neatly.ngrok-free.app/checkout/create_preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            cart.map(({ beer_id, quantity, image, name, price }) => ({
              id: beer_id,
              quantity,
              title: name,
              unit_price: price / 1000,
              picture_url: image,
              user_id: user?.id,
            }))
          ),
        }
      )
    ).json();

    setPreferenceId(id);
  };

  useEffect(() => {
    if (!loadingUser && !session && !user) navigate("/sesion");
    handleInitMP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, cart]);

  return (
    <div className="checkout">
      <Text tag="h2">Estas por pagar por las siguientes cervezas</Text>
      <div className="products">
        {cart.map(({ name, price, quantity, image }) => (
          <div>
            <img src={image} />
            <div>
              <Text tag="h2">{name}</Text>
              <Text>
                {price} x {quantity}
              </Text>
            </div>
          </div>
        ))}
      </div>
      {!preferenceId && <Loader />}
      {preferenceId && (
        <Wallet locale="es-AR" initialization={{ preferenceId }} />
      )}
    </div>
  );
};

export default Checkout;
