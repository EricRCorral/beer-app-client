import { useContext, useEffect } from "react";
import { Error, Loader, ProductCard, Text } from "../../components";
import { UserContext } from "../../context";
import { Beer } from "../../types/Beer";
import { API_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import AnimatedBox from "../../components/AnimatedBox";

const WishList = () => {
  const { user, setUser } = useContext(UserContext);

  const {
    data: beers,
    loading,
    error,
  } = useFetch<Omit<Beer, "description" | "abv" | "ibu">[]>(`${API_URL}beers`);

  const getFavs = async () => {
    if (!user) return;

    const FAVS: number[] = await (
      await fetch(`${API_URL}wishlist/${user?.id}`)
    ).json();

    setUser({ ...user, favs: FAVS });
  };

  const FAVS = beers?.filter(({ id }) => user?.favs.includes(id)) || [];

  useEffect(() => {
    if (user?.favs.length === 0) getFavs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.favs.length]);

  if (error) return <Error message={error} />;

  if (loading) return <Loader />;

  return (
    <>
      {FAVS.length === 0 && (
        <Text tag="h2" className="no-data">
          Aun no has agregado favoritos a tu lista, puedes añadirlos desde la
          tienda! 🍻
        </Text>
      )}
      <div className="favs">
        {FAVS.length > 0 &&
          FAVS.map((beer) => (
            <AnimatedBox key={beer.id}>
              <ProductCard {...beer} />
            </AnimatedBox>
          ))}
      </div>
    </>
  );
};

export default WishList;
