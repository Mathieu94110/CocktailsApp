import { getCurrentUser } from 'api';

export async function rootLoader() {
  return getCurrentUser();
}
