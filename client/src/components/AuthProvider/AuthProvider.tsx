import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { signin as login, signout as logout } from 'api/auth';
import { UsersInterface } from 'interfaces';
import { AuthContext } from 'context';

function AuthProvider({ children }: { children: any }) {
  const initialUser = useLoaderData();
  const [user, setUser] = useState<any>(initialUser);

  async function signin(credentials: UsersInterface) {
    const newUser: UsersInterface = await login(credentials);
    if (newUser._id) {
      window.localStorage.setItem('userId', newUser._id);
    }
    setUser(newUser);
  }
  async function signout() {
    await logout();
    setUser(null);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
