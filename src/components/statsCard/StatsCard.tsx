import { ReactElement } from 'react';
import styles from './styles.module.scss';

export interface IStatsCardProps {
  title: string;
  icon: ReactElement;
  value: string | number;
}

const StatsCard = ({ title, icon, value }: IStatsCardProps) => {
  return (
    <div className={styles['stats-card-container']}>
      <div className={styles['card-title-container']}>
        <div className={styles['card-title']}>{title}</div>
        <div>{icon}</div>
      </div>
      <div className={styles['values-container']}>
        <div>{value}</div>
      </div>
    </div>
  );
};

export default StatsCard;
