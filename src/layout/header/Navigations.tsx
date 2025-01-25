import { INavigationItem } from '@/interfaces';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import { GoHome } from 'react-icons/go';
import { MdOutlineLocalMovies } from 'react-icons/md';

const Navigations = () => {
  const navigationItems: INavigationItem[] = [
    {
      name: 'Home',
      icon: <GoHome />,
      url: '/',
    },
    {
      name: 'Movies',
      icon: <MdOutlineLocalMovies />,
      url: '/movies',
    },
  ];

  return (
    <div className={styles['nav-container']}>
      {navigationItems.map((nav) => (
        <NavLink
          key={nav.name}
          to={nav.url}
          className={styles['nav-item']}
          style={({ isActive }) => {
            return {
              filter: isActive ? 'brightness(100%)' : '',
            };
          }}
        >
          {nav.icon}
          <span> {nav.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Navigations;
