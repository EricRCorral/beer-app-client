export type User = {
  id: string;
  username: string;
} | null;

export type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};
