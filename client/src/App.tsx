import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer, AuthProvider, Loading } from 'components';
import styles from './App.module.scss';

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <Header />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
