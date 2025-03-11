export type SnackBar = {
  message: string;
  time?: number;
  color?: "" | "danger" | "success";
};

export type SnackBarContextType = {
  snackBar: SnackBar;
  setSnackBar: (snackBar: SnackBar) => void;
};
