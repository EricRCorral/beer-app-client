import { useContext } from "react";
import { CartContext, SnackBarContext, UserContext } from "../../context";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Color } from "../../types/Beer";
import { Text } from "..";
import handleModifyCart from "../Cart/handleModifyCart";

import "./product-card.css";

interface ProductCardProps {
  id: number;
  image: string;
  color: Color;
  price: number;
  name: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  color,
  id,
  image,
  price,
  name,
}) => {
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const { setSnackBar } = useContext(SnackBarContext);

  const IS_FAV = user?.favs?.includes(id);

  const navigate = useNavigate();

  const handleFavorite = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();

    if (!user?.id) {
      navigate("/sesion");
      return;
    }

    const RESP = await fetch("https://mature-halibut-neatly.ngrok-free.app/wishlist", {
      method: IS_FAV ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id, beerId: id }),
    });

    if (RESP.status === 204) {
      setUser(
        IS_FAV
          ? {
              ...user,
              favs: user.favs.filter((currentId) => currentId !== id),
            }
          : { ...user, favs: [...user.favs, id] }
      );

      setSnackBar({
        message: IS_FAV
          ? `Se ha quitado a ${name} de sus favoritos`
          : `Se ha agregado a ${name} a sus favoritos`,
        color: "success",
      });
    }
  };

  const handleCart = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();

    const RESP = await handleModifyCart(
      user,
      [
        ...cart,
        {
          beer_id: id,
          name,
          image,
          price,
          quantity: 0,
          user_id: user?.id || "",
        },
      ],
      setCart,
      id,
      1
    );

    if (RESP)
      setSnackBar({
        message: RESP.message,
        color: RESP.ok ? "success" : "danger",
      });
  };

  const handleNavigate = (id: number) => navigate(`/tienda/producto/${id}`);

  return (
    <div key={id} className="product-card" onClick={() => handleNavigate(id)}>
      {IS_FAV ? (
        <BsHeartFill onClick={(e) => handleFavorite(e, id)} className="fav" />
      ) : (
        <BsHeart onClick={(e) => handleFavorite(e, id)} className="fav" />
      )}
      <div>
        <img src={image} />
      </div>
      <Text tag="h3">
        {name} - {color}
      </Text>
      <Text className="price-cart">
        $ {price} <FaCartPlus onClick={(e) => handleCart(e)} />
      </Text>
    </div>
  );
};

export default ProductCard;
