import { UsersInterface } from './users.interface';

export interface AuthContextInterface {
  user: UsersInterface;
  signin: (x: UsersInterface) => Promise<void>;
  signout: () => Promise<void>;
}
