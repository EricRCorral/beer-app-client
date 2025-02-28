import { createElement } from "react";

import "./text.css";

type TextProps = {
  tag?:
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "span"
    | "small"
    | "strong";
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const Text = ({ tag = "p", children, className, ...props }: TextProps) => {
  const CLASS = className ? `text ${className}` : `text`;
  return createElement(tag, { className: CLASS, ...props }, children);
};

export default Text;
