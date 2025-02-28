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
}

const ProductCard: React.FC<ProductCardProps> = ({
  color,
  id,
  image,
  price,
  name,
}) => {
  // WIP
  const IS_FAV = false;
  const handleFavorite = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    console.log(id);
  };

  // WIP: CREATE THIS FUNCTION
  const addToCart = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    console.log(id);
  };

  const navigate = useNavigate();

  const handleNavigate = (id: number) => navigate(`producto/${id}`);

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
      <Text>
        $ {price}{" "}
        <FaCartPlus className="cart" onClick={(e) => addToCart(e, id)} />
      </Text>
    </div>
  );
};

export default ProductCard;
