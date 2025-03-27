import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Error, Loader, Text } from "../../components";
import { Beer } from "../../types/Beer";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { CartContext, SnackBarContext, UserContext } from "../../context";
import { API_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import handleModifyCart from "../../components/Cart/handleModifyCart";

const Product = () => {
  const { id } = useParams();

  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const { setSnackBar } = useContext(SnackBarContext);

  const navigate = useNavigate();

  const { data, error, loading } = useFetch<Beer>(`${API_URL}beers/${id}`);

  const [cartNumber, setCartNumber] = useState(1);

  const handleQuantity = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    quantity: number
  ) => {
    e.stopPropagation();
    if (cartNumber + quantity <= 0) return;
    setCartNumber((prev) => prev + quantity);
  };

  const IS_FAV = user?.favs?.includes(Number(id));

  const handleFavorite = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();

    if (!user?.id) {
      navigate("/sesion");
      return;
    }

    const resp = await fetch(`${API_URL}wishlist`, {
      method: IS_FAV ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id, beerId: id }),
    });

    if (resp.status === 204) {
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

  if (error) return <Error message={error} />;

  if (loading)
    return (
      <div className="product-loader">
        <Loader />
      </div>
    );

  const {
    abv,
    color,
    density,
    description,
    ibu,
    image,
    name,
    price,
    id: beer_id,
  } = data!;

  const handleCart = async () => {
    const RESP = await handleModifyCart(
      user,
      [
        ...cart,
        { beer_id, name, image, price, quantity: 0, user_id: user?.id || "" },
      ],
      setCart,
      beer_id,
      cartNumber
    );

    if (RESP)
      setSnackBar({
        message: RESP.message,
        color: RESP.ok ? "success" : "danger",
      });
  };

  return (
    <div className="product">
      <img src={image} alt="" />
      <div>
        <Text tag="h1">{name}</Text>
        <Text>{description}</Text>
        <Text>Color: {color}</Text>
        <Text>Cuerpo: {density}</Text>
        <Text>ABV: {abv}%</Text>
        <Text>IBU: {ibu}</Text>
        <Text tag="h2">$ {price}</Text>
        <div className="buttons">
          <Button onClick={handleCart}>
            Agregar {cartNumber} al carrito
            <div className="cart-icons">
              <FaCaretUp onClick={(e) => handleQuantity(e, 1)} />
              <FaCaretDown
                className={cartNumber <= 1 ? "disabled" : ""}
                onClick={(e) => handleQuantity(e, -1)}
              />
            </div>
          </Button>
          <div className="cart-buttons"></div>
          <Button onClick={(e) => handleFavorite(e, Number(id))}>
            {IS_FAV ? "Quitar de favoritos" : "Agregar a favoritos"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
