import { useWindowSize } from '@/hooks/useWindowSize';
import styles from './styles.module.scss';
import { ITableActionButton } from '@/interfaces';

const ActionButtons = <T,>({
  actionButtons,
  data,
  index,
}: {
  actionButtons?: ITableActionButton<T>[];
  data: T;
  index: number;
}) => {
  const { width } = useWindowSize();

  return width > 768 ? (
    <td className={styles['action-btns-container']}>
      {actionButtons?.map((item) => (
        <span key={item.label}>
          <button
            disabled={item?.disabled ? item?.disabled(data, index) : false}
            onClick={() => {
              item.onClick(data, index);
            }}
            className={`${styles[`action-btn`]} ${styles[`${item.variant}`]}`}
          >
            {item.icon}
            {item.label}
          </button>
        </span>
      ))}
    </td>
  ) : (
    <div className={styles['action-btns-container']}>
      {actionButtons?.map((item) => (
        <span key={item.label}>
          <button
            disabled={item?.disabled ? item?.disabled(data, index) : false}
            onClick={() => {
              item.onClick(data, index);
            }}
            className={`${styles[`action-btn`]} ${styles[`${item.variant}`]}`}
          >
            {item.icon}
            {item.label}
          </button>
        </span>
      ))}
    </div>
  );
};

export default ActionButtons;
