import ApiAuth from 'api/auth';

export const currentUser = async () => {
  const user = await ApiAuth.getCurrentUser();
  return user ?? null;
};
