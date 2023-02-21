import ApiAuth from 'api/auth';
import { UsersInterface } from 'interfaces';

export const rootLoader = async (): Promise<UsersInterface> => {
  return ApiAuth.getCurrentUser();
};
