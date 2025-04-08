import { User } from 'interfaces';

const signin = async (credentials: User): Promise<User> => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    throw new Error('An error occured during signin');
  }
};

const getCurrentUser = async (): Promise<User> => {
  const response = await fetch('/api/auth/current');
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    throw new Error('An error occured during getting current user');
  }
};

const createUser = async (newUser: User): Promise<Response> => {
  const data = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  return data;
};

const signout = async (): Promise<void> => {
  await fetch('/api/auth/', {
    method: 'DELETE',
  });
};
const AuthApi = {
  signin,
  getCurrentUser,
  createUser,
  signout,
};

export default AuthApi;
