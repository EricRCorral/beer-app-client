import { Fragment, useState } from "react";
import { Button, Error, Loader, Text } from "../";
import { Link } from "react-router-dom";
import { Beer } from "../../types/Beer";

import "./Collage.css";

interface CollageProps {
  beers: Beer[] | null;
  loading: boolean;
  error: string;
}

const Collage: React.FC<CollageProps> = ({ beers, loading, error }) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const handleExpandItem = (index: number | null) =>
    setActiveIndex(activeIndex === index ? null : index);

  if (loading) return <Loader />;

  if (error) return <Error message={error} />;

  return (
    <div className="collage">
      {beers?.slice(0, 6).map(({ image, description, name, id }, index) => (
        <Fragment key={id}>
          <img
            className={`collage-item item-${index} ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleExpandItem(index)}
            src={image}
          />
          <div className="info">
            <Text tag="h2">{name}</Text>
            <Text>{description}</Text>
            <Link to={`/tienda/producto/${id}`}>
              <Button>Ver detalles</Button>
            </Link>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Collage;
