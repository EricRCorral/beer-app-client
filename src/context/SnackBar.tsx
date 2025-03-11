import { createContext, ReactElement, useState } from "react";
import { SnackBar, SnackBarContextType } from "../types/SnackBar";

// eslint-disable-next-line react-refresh/only-export-components
export const SnackBarContext = createContext<SnackBarContextType>({
  snackBar: { message: "", time: 5000, color: "" },
  setSnackBar: () => {},
});

export const SnackBarProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [snackBar, setSnackBar] = useState<SnackBar>({
    message: "",
    time: 5000,
    color: "",
  });

  return (
    <SnackBarContext.Provider value={{ snackBar, setSnackBar }}>
      {children}
    </SnackBarContext.Provider>
  );
};
