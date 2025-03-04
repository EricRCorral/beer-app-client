import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { PAGES } from "../../constants";
import { Text } from "../";

import "./footer.css";

const Footer = () => {
  const { pathname } = useLocation();

  if (pathname === "/sesion") return <></>;

  return (
    <footer>
      <div className="page-links">
        {PAGES.map(({ text, url }) => (
          <Link key={text} to={url}>
            <Text>{text}</Text>
          </Link>
        ))}
      </div>
      <div className="social">
        <Text>Seguinos en:</Text>
        <a href="https://www.facebook.com/" target="_blank">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <FaInstagram />
        </a>
      </div>
      <div className="copyright">
        <Text>
          Web desarrollada por{" "}
          <a href="https://github.com/EricRCorral" target="_blank">
            Eric C.
          </a>
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
