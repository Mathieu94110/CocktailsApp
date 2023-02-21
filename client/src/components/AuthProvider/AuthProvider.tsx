import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from 'context';
import AuthApi from 'api/auth';
import { UsersInterface } from 'interfaces';

export const AuthProvider = ({ children }: { children: any }) => {
  const initialUser = useLoaderData();
  const [user, setUser] = useState<any>(initialUser);

  const signin = async (credentials: UsersInterface): Promise<void> => {
    const newUser: UsersInterface = await AuthApi.signin(credentials);
    if (newUser._id) {
      window.localStorage.setItem('userId', newUser._id);
    }
    setUser(newUser);
  };
  const signout = async (): Promise<void> => {
    await AuthApi.signout();
    setUser(null);
  };
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
};
