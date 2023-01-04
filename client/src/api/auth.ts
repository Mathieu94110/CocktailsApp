import { UsersInterface } from '../interfaces';

const API_AUTH = '/api/auth';

export async function signin(credentials: UsersInterface) {
  const response = await fetch(API_AUTH, {
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
    throw new Error('An error occured on auth api');
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_AUTH}/current`);
  return response.json();
}

export async function signout() {
  await fetch(API_AUTH, {
    method: 'DELETE',
  });
}
