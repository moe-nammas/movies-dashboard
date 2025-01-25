import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import styles from './styles.module.scss';

const Layout = () => {
  return (
    <div className={styles['container-wrapper']}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
