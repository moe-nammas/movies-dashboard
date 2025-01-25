import { ReactElement } from 'react';
import styles from './styles.module.scss';

export interface IBadgeProps {
  text?: string;
  variant?: 'success' | 'danger' | 'default';
  children?: ReactElement;
}

const Badge = ({ text, children, variant = 'default' }: IBadgeProps) => {
  return (
    <div className={`${styles['badge']} ${styles[`${variant}`]}`}>
      {children || text}
    </div>
  );
};

export default Badge;
