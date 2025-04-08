export type User = {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
}

export interface UserContextType {
  user: User | null;
  signin: (credentials: User) => Promise<void>;
  signout: () => Promise<void>
}