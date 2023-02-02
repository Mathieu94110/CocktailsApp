import { UsersInterface } from 'interfaces';

const API_USERS = '/api/users';

export const createUser = async (newUser: UsersInterface) => {
  const response = await fetch(API_USERS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error('Error on createUser api');
    }
  }
};
