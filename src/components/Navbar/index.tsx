import { useEffect, useState } from "react";
import { IoCloseCircleOutline, IoCart, IoMenu } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { Cart, Text } from "../";
import { Beer } from "../../assets/img/";
import { PAGES } from "../../constants";
import { Link, useLocation } from "react-router-dom";

import "./navbar.css";

interface NavbarProps {
  hidden: boolean;
  handleCartVisibility: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleCartVisibility, hidden }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  const handleMenu = () => setIsOpen((prev) => !prev);

  const setNavbarBackground = () => {
    const NAVBAR = document.querySelector(".navbar");
    if (window.scrollY > 90) {
      NAVBAR?.classList.add("active");
    } else {
      NAVBAR?.classList.remove("active");
    }
  };

  const Content = () => (
    <>
      <div className="account-cart-box">
        <Link to="cuenta">
          <FaUser className="user-icon" />
        </Link>
        <IoCart onClick={handleCartVisibility} className="cart-icon" />
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

  useEffect(() => {
    window.addEventListener("scroll", setNavbarBackground);
    return () => removeEventListener("scroll", setNavbarBackground);
  }, []);

  if (pathname === "/sesion") return <></>;

  return (
    <>
      <nav className="navbar">
        <div className={`navbar-modal ${isOpen ? "" : "hidden"}`}>
          <Content />
        </div>
        <div className="navbar-fixed">
          <Content />
        </div>
      </nav>
      <Cart hidden={hidden} handleCartVisibility={handleCartVisibility} />
    </>
  );
};

export default Navbar;
