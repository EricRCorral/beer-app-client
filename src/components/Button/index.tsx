import "./button.css";

const Button: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...rest
}) => {
  const CLASS = rest.className ? `btn ${rest.className}` : "btn";

  return (
    <button {...rest} className={CLASS}>
      {children}
    </button>
  );
};

export default Button;
