import { useContext, useEffect } from "react";
import { Error, Loader, ProductCard, Text } from "../../components";
import { UserContext } from "../../context";
import { Beer } from "../../types/Beer";
import useFetch from "../../hooks/useFetch";

const WishList = () => {
  const { user, setUser } = useContext(UserContext);

  const {
    data: beers,
    loading,
    error,
  } = useFetch<Omit<Beer, "description" | "abv" | "ibu">[]>(
    "https://mature-halibut-neatly.ngrok-free.app/beers"
  );

  const getFavs = async () => {
    if (!user) return;

    const FAVS: number[] = await (
      await fetch(`https://mature-halibut-neatly.ngrok-free.app/wishlist/${user?.id}`)
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
        <Text tag="h2">
          Aun no has agregado favoritos a tu lista, puedes añadirlos desde la
          tienda! 🍻
        </Text>
      )}
      <div className="favs">
        {FAVS.length > 0 &&
          FAVS.map((beer) => <ProductCard key={beer.id} {...beer} />)}
      </div>
    </>
  );
};

export default WishList;
