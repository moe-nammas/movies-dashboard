import styles from './styles.module.scss';
import Navigations from './Navigations';

const Header = () => {
  return (
    <div className={styles['header-container']}>
      <div className={styles['left-side']}>
        <Navigations />
      </div>
    </div>
  );
};

export default Header;
