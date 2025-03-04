export type Auth = {
  id: string;
  username: string;
} | null;

export type AuthContextType = {
  auth: Auth;
  setAuth: (auth: Auth) => void;
};
