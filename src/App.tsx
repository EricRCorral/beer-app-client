import { useLayoutEffect } from "react";
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

const Wrapper: React.FC<{ children: JSX.Element[] }> = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => (
  <BrowserRouter>
    <Wrapper>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sesion" element={<Session />} />
        <Route path="sobre-nosotros" element={<AboutUs />} />
        <Route path="produccion" element={<Production />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="carrito" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="cuenta" element={<Account />}>
          <Route path="historial" element={<History />} />
          <Route path="favoritos" element={<WishList />} />
        </Route>
        <Route path="tienda" element={<Store />}>
          <Route path="producto/:id" element={<Product />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Chatbox />
    </Wrapper>
  </BrowserRouter>
);

export default App;
