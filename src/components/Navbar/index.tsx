import { useEffect, useState } from "react";
import { IoCloseCircleOutline, IoCart, IoMenu } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { Text } from "../";
import { Beer } from "../../assets/img/";
import { PAGES } from "../../constants";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Content = () => (
    <>
      <div className="account-cart-box">
        <Link to="cuenta">
          <FaUser className="user-icon" />
        </Link>
        <Link to="carrito">
          <IoCart className="cart-icon" />
        </Link>
      </div>
      <img src={Beer} alt="Beer logo" />
      {PAGES.map(({ text, url }) => (
        <Link key={text} className="page-section" onClick={handleMenu} to={url}>
          <Text tag="h4">{text}</Text>
        </Link>
      ))}
      <IoMenu className="menu-icon" onClick={handleMenu} />
      <IoCloseCircleOutline className="close-icon" onClick={handleMenu} />
    </>
  );

  const handleMenu = () => setIsOpen((prev) => !prev);

  const setNavbarBackground = () => {
    const NAVBAR = document.querySelector(".navbar");
    if (window.scrollY > 90) {
      NAVBAR?.classList.add("active");
    } else {
      NAVBAR?.classList.remove("active");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setNavbarBackground);
    return () => removeEventListener("scroll", setNavbarBackground);
  }, []);

  return (
    <nav className="navbar">
      <div className={`navbar-modal ${isOpen ? "" : "hidden"}`}>
        <Content />
      </div>
      <div className="navbar-fixed">
        <Content />
      </div>
    </nav>
  );
};

export default Navbar;
