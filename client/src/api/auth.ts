import { UsersInterface } from 'interfaces';

export const signin = async (
  credentials: UsersInterface
): Promise<UsersInterface> => {
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

export const getCurrentUser = async (): Promise<UsersInterface> => {
  const response = await fetch('/api/auth/current');
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    throw new Error('An error occured during getting current user');
  }
};

export const signout = async (): Promise<void> => {
  await fetch('/api/auth/', {
    method: 'DELETE',
  });
};
