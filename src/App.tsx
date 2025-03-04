import { useContext, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  AboutUs,
  Account,
  Cart,
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
import useFetch from "./hooks/useFetch";
import { Auth } from "./types/Auth";
import { AuthContext } from "./context";

const Wrapper: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  const { data: session, loading } = useFetch<Auth>(
    "http://localhost:3000/auth/session",
    {
      credentials: "include",
    }
  );

  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && session)
      setAuth({ id: session.id, username: session.username });
  }, [session, loading, setAuth]);

  return (
    <BrowserRouter>
      <Wrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sesion" element={<Session loading={loading} />} />
          <Route path="sobre-nosotros" element={<AboutUs />} />
          <Route path="produccion" element={<Production />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="cuenta" element={<Account />}>
            <Route path="historial" element={<History />} />
            <Route path="favoritos" element={<WishList />} />
          </Route>
          <Route path="tienda" element={<Store />} />
          <Route path="tienda/producto/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Chatbox />
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;
