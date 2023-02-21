import { UsersInterface } from 'interfaces';

const signin = async (credentials: UsersInterface): Promise<UsersInterface> => {
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

const getCurrentUser = async (): Promise<UsersInterface> => {
  const response = await fetch('/api/auth/current');
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    throw new Error('An error occured during getting current user');
  }
};

const createUser = async (newUser: UsersInterface): Promise<UsersInterface> => {
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
