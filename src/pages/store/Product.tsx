import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Error, Loader, Text } from "../../components";
import { Beer } from "../../types/Beer";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { UserContext } from "../../context";
import useFetch from "../../hooks/useFetch";

const Product = () => {
  const { id } = useParams();

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const { data, error, loading } = useFetch<Beer>(
    `http://localhost:3000/beers/${id}`
  );

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

    if (!user) {
      navigate("/sesion");
      return;
    }

    const resp = await fetch("http://localhost:3000/wishlist", {
      method: IS_FAV ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id, beerId: id }),
    });

    if (resp.status === 204)
      setUser(
        IS_FAV
          ? {
              ...user,
              favs: user.favs.filter((currentId) => currentId !== id),
            }
          : { ...user, favs: [...user.favs, id] }
      );
  };

  // WIP: CREATE CART FUNCTIONS
  const addToCart = () => console.log(id);
  /////////////////////////////

  if (error) return <Error message={error} />;

  if (loading)
    return (
      <div className="product-loader">
        <Loader />
      </div>
    );

  const { abv, color, density, description, ibu, image, name, price } = data!;

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
          <Button onClick={addToCart}>
            Agregar {cartNumber} al carrito
            <div className="cart-icons">
              <FaCaretUp onClick={(e) => handleQuantity(e, 1)} />
              <FaCaretDown onClick={(e) => handleQuantity(e, -1)} />
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
