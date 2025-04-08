import { User } from './users.interface';

export interface AuthContextInterface {
  user: User;
  signin: (x: User) => Promise<void>;
  signout: () => Promise<void>;
}

export interface UserProviderProps {
  children: React.ReactNode
}