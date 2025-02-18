import { createElement } from "react";

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

const Text = ({ tag = "p", children, ...props }: TextProps) =>
  createElement(tag, { className: "text", ...props }, children);

export default Text;
