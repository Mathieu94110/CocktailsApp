import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/HeaderMenu/HeaderMenu';
import Footer from './components/Footer';
import styles from './App.module.scss';
import AuthProvider from 'components/AuthProvider/AuthProvider';

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
