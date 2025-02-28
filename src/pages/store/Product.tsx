import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Error, Loader, Text } from "../../components";
import { Beer } from "../../types/Beer";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import useFetch from "../../hooks/useFetch";

const Product = () => {
  const { id } = useParams();

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

  // WIP
  const IS_FAV = false;
  const handleFavorite = () => console.log(id);

  // WIP: CREATE THIS FUNCTION
  const addToCart = () => console.log(id);

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
          <Button onClick={handleFavorite}>
            {IS_FAV ? "Quitar de favoritos" : "Agregar a favoritos"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
