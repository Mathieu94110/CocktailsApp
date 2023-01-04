import { getCurrentUser } from '../api/auth';

export async function rootLoader() {
  return getCurrentUser();
}
