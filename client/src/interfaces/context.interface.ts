import { UsersInterface } from './users.interface';

export interface AuthContextInterface {
  user: UsersInterface;
  signin: (x: UsersInterface) => Promise<UsersInterface>;
  signout: () => Promise<void>;
}
