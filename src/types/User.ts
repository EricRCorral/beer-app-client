export type User = {
  id: string;
  username: string;
  favs: number[]
} | null;

export type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};
