import { UsersInterface } from 'interfaces';

export const createUser = async (
  newUser: UsersInterface
): Promise<UsersInterface> => {
  const data = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  const response = await data.json();
  if (data.ok) {
    return response;
  } else {
    if (response) {
      throw response;
    } else {
      throw new Error('Error on createUser api');
    }
  }
};