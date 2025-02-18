import { Fragment, useState } from "react";
import { Button, Text } from "../";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

import "./Collage.css";

type CollageProps = {
  id: string | number;
  image: string;
  title: string;
  description: string;
};

const Collage: React.FC<{
  items: CollageProps[];
  addToCart: (id: string | number) => void;
}> = ({ items, addToCart }) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const handleExpandItem = (index: number | null) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <div className="collage">
      {items.map(({ image, description, title, id }, index) => (
        <Fragment key={id}>
          <img
            className={`collage-item item-${index} ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleExpandItem(index)}
            src={image}
          />
          <div className="info">
            <Text tag="h3">{title}</Text>
            <Text>{description}</Text>
            <div>
              <Link to={`/store/product/${id}`}>
                <Button>Ver detalles</Button>
              </Link>
              <FaCartPlus onClick={() => addToCart(id)} />
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Collage;
