import { FaWhatsapp } from "react-icons/fa6";
import "./chat-box.css";

const ChatBox = () => (
  <a
    className="chat-box"
    href="https://api.whatsapp.com/send?phone=541112345678&text=Hola Beer! Quisiera realizarte algunas consultas"
    target="_blank"
  >
    <FaWhatsapp />
  </a>
);

export default ChatBox;
