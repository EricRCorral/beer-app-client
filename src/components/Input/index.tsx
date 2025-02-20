import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import "./input.css";

const TextInput: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ type, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="input-box">
      <input
        {...rest}
        type={type !== "password" ? type : showPassword ? "text" : "password"}
      />
      {type === "password" && showPassword && (
        <FaEye onClick={handleShowPassword} />
      )}
      {type === "password" && !showPassword && (
        <FaEyeSlash onClick={handleShowPassword} />
      )}
    </div>
  );
};

export default TextInput;
