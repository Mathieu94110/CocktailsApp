import { useState, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { User, UserContextType, UserProviderProps } from 'interfaces';
import AuthApi from 'api/auth';

export const userContextInitialValues = {
  user: null,
  signin: () => Promise.resolve(),
  signout: () => Promise.resolve(),
};

export const AuthContext = createContext<UserContextType>(userContextInitialValues);

export const AuthProvider = (props: UserProviderProps) => {
  const initialUser = useLoaderData() as User | null;
  const [user, setUser] = useState(initialUser);

  const signin = async (credentials: User): Promise<void> => {
    const newUser: User = await AuthApi.signin(credentials);
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
      {props.children}
    </AuthContext.Provider>
  );
};
