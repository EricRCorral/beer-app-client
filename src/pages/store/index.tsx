import { useEffect, useState } from "react";
import { Beer, Color, Density } from "../../types/Beer";
import { Error, Loader, ProductCard, SelectBar, Text } from "../../components";
import useFetch from "../../hooks/useFetch";

import "./store.css";

const COLORS: Color[] = ["Rubia", "Roja", "Negra"];
const DENSITIES: Density[] = ["Ligero", "Medio", "Alto"];

const Store = () => {
  const { data, loading, error } = useFetch<
    Omit<Beer, "description" | "abv" | "ibu">[]
  >("http://localhost:3000/beers");

  const [beers, setBeers] = useState<
    Omit<Beer, "description" | "abv" | "ibu">[]
  >([]);

  const [{ color, density }, setFilters] = useState<{
    color: Color | "";
    density: Density | "";
  }>({
    color: "",
    density: "",
  });

  const handleFilters = (key: "color" | "density", value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));

  useEffect(() => {
    if (data)
      setBeers(
        data.filter(
          (beer) =>
            (!color || beer.color === color) &&
            (!density || beer.density === density)
        )
      );
  }, [data, color, density]);

  if (error) return <Error message={error} />;

  return (
    <div className="store">
      <Text tag="h1">Nuestras cervezas</Text>
      <div className="filters">
        <SelectBar
          values={COLORS}
          handleSelect={(value) => handleFilters("color", value)}
          active={color}
        />
        <SelectBar
          values={DENSITIES}
          handleSelect={(value) => handleFilters("density", value)}
          active={density}
        />
      </div>

      {loading && <Loader />}
      {beers.length === 0 && (
        <Text tag="h1" className="no-beers">
          No se encontraron cervezas
        </Text>
      )}
      {beers.length > 0 && (
        <div className="products">
          {beers.map((beer) => (
            <ProductCard key={beer.id} {...beer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
