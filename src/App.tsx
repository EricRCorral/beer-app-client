import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { Footer, Navbar } from "./components";
import ChatBox from "./components/Chatbox";

const App = () => (
  <BrowserRouter>
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
    <ChatBox />
  </BrowserRouter>
);

export default App;
