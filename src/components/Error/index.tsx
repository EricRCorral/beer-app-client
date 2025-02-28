import React from "react";
import { Text } from "..";

import "./error.css";

type Error = { message: string } & React.HTMLAttributes<HTMLElement>;

const Error: React.FC<Error> = ({ message, ...rest }) => {
  return (
    <Text {...rest} tag="h1" className="error-message">
      {message}
    </Text>
  );
};

export default Error;
