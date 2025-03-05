import { useContext } from "react";
import { UserContext } from "../../context";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Color } from "../../types/Beer";
import { Text } from "..";

import "./product-card.css";

interface ProductCardProps {
  id: number;
  image: string;
  color: Color;
  price: number;
  name: string;
  isFav: boolean;
  setFavs: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  color,
  id,
  image,
  price,
  name,
  isFav,
  setFavs,
}) => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleFavorite = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();

    if (!user) {
      navigate("/sesion");
      return;
    }

    const resp = await fetch("http://localhost:3000/wishlist", {
      method: isFav ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id, beerId: id }),
    });

    if (resp.status === 204)
      setFavs((prev) => {
        if (isFav) return prev.filter((currentId) => currentId !== id);
        return [...prev, id];
      });
  };

  // WIP: CREATE CART FUNCTIONS
  const addToCart = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    console.log(id);
  };
  /////////////////////////////

  const handleNavigate = (id: number) => navigate(`producto/${id}`);

  return (
    <div key={id} className="product-card" onClick={() => handleNavigate(id)}>
      {isFav ? (
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
      <Text>
        $ {price}{" "}
        <FaCartPlus className="cart" onClick={(e) => addToCart(e, id)} />
      </Text>
    </div>
  );
};

export default ProductCard;
