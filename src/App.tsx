import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Home,
  AboutUs,
  Account,
  Checkout,
  Contact,
  History,
  Product,
  Production,
  Store,
  WishList,
  Session,
  NotFound,
} from "./pages";
import { Footer, Navbar, Chatbox } from "./components";
import { User } from "./types/User";
import { UserContext } from "./context";
import useFetch from "./hooks/useFetch";
import SnackBar from "./components/SnackBar";

const Wrapper: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (location.search.length > 0) navigate("/");
  }, [location.search.length, navigate]);

  return children;
};

const App = () => {
  const { data: session, loading } = useFetch<User | false>(
    "https://mature-halibut-neatly.ngrok-free.app/user/session",
    {
      credentials: "include",
    }
  );

  const [cartHidden, setCartHidden] = useState(true);

  const handleCartVisibility = () => setCartHidden((prev) => !prev);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (!loading && session)
      setUser({ id: session.id, username: session.username, favs: [] });
  }, [session, loading, setUser]);

  return (
    <BrowserRouter>
      <Wrapper>
        <Navbar
          hidden={cartHidden}
          handleCartVisibility={handleCartVisibility}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sesion" element={<Session loading={loading} />} />
          <Route path="sobre-nosotros" element={<AboutUs />} />
          <Route path="produccion" element={<Production />} />
          <Route path="contacto" element={<Contact />} />
          <Route
            path="checkout"
            element={<Checkout loadingUser={loading} session={session} />}
          />
          <Route
            path="cuenta"
            element={<Account loadingUser={loading} session={session} />}
          >
            <Route path="historial" element={<History />} />
            <Route path="favoritos" element={<WishList />} />
          </Route>
          <Route path="tienda" element={<Store />} />
          <Route path="tienda/producto/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Chatbox />
        <div className="background-overlay" onClick={handleCartVisibility} />
        <SnackBar />
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;
