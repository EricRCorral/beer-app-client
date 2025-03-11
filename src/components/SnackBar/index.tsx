import { useContext, useEffect, useRef } from "react";
import { SnackBarContext } from "../../context";

import "./snackbar.css";

const SnackBar = () => {
  const {
    snackBar: { message, time = 5000, color = "" },
    setSnackBar,
  } = useContext(SnackBarContext);

  const timeOut = useRef(0);

  useEffect(() => {
    if (message.length > 0) {
      clearTimeout(timeOut.current);
      const SNACKBAR = document.querySelector(".snackbar");

      SNACKBAR?.animate(
        [
          {
            opacity: 0,
            transform: "scale(0.9)",
          },
          {
            opacity: 1,
            transform: "scale(1)",
            offset: 0.1,
          },
          {
            opacity: 1,
            transform: "scale(1)",
            offset: 0.8,
          },
          {
            opacity: 0,
            transform: "scale(0.9)",
            offset: 1,
          },
        ],
        { duration: time }
      );

      timeOut.current = setTimeout(() => {
        setSnackBar({ message: "", time: 5000, color: "" });
      }, time);
    }
  }, [setSnackBar, time, message]);

  if (message.length === 0) return <></>;

  return <div className={`snackbar ${color}`}>{message}</div>;
};

export default SnackBar;
