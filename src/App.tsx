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

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="session" element={<Session />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="production" element={<Production />} />
      <Route path="contact" element={<Contact />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="account" element={<Account />}>
        <Route path="history" element={<History />} />
        <Route path="wish-list" element={<WishList />} />
      </Route>
      <Route path="store" element={<Store />}>
        <Route path="product/:id" element={<Product />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
