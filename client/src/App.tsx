import { Suspense, useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from 'components';
import { Header, Footer } from 'layouts';
import cocktailsReducer from 'reducers/cocktailsReducer';
import {
  CocktailStateContext,
  CocktailsDispatcherContext,
  ToastContextProvider,
  AuthProvider
} from 'context';
import styles from './App.module.scss';
import { CocktailInterface } from 'interfaces';

const App = () => {
  const [state, dispatch] = useReducer(cocktailsReducer, {
    cocktails: [] as CocktailInterface[],
    suggests: [] as CocktailInterface[],
  });

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <CocktailStateContext.Provider value={state}>
          <CocktailsDispatcherContext.Provider value={dispatch}>
            <ToastContextProvider>
              <Header />
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
              <Footer />
            </ToastContextProvider>
          </CocktailsDispatcherContext.Provider>
        </CocktailStateContext.Provider>
      </AuthProvider>
    </div>
  );
};

export default App;
