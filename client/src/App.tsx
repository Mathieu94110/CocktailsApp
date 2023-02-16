import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer, AuthProvider, Loading } from 'components';
import { ToastContextProvider } from 'context';
import styles from './App.module.scss';

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <ToastContextProvider>
          <Header />
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
          <Footer />
        </ToastContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
