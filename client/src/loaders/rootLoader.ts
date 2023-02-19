import { getCurrentUser } from 'api';
import { UsersInterface } from 'interfaces';

export const rootLoader = async (): Promise<UsersInterface> => {
  return getCurrentUser();
};
