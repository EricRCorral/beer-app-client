import React, { ReactNode } from "react";
import useIntersection from "../../hooks/useIntersection";

interface AnimatedBoxProps {
  children: ReactNode;
  className?: string;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ children, className }) => {
  const [ref, isVisible] = useIntersection();

  return (
    <div
      ref={ref}
      className={`animated-box ${isVisible ? "active" : ""} ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default AnimatedBox;
