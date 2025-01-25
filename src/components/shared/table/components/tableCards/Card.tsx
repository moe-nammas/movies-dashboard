import { useTable } from '@/hooks/useTable';
import { ITableActionButton, ITableCell } from '@/interfaces';
import styles from './styles.module.scss';
import ActionButtons from '../tableActionButtons/ActionButtons';

export interface ICardProps<T> {
  columns: ITableCell<T>[];
  data: T;
  actionButtons?: ITableActionButton<T>[];
  index: number;
  onRowClick?: (row: T) => void;
}

const Card = <T,>({
  data,
  columns,
  actionButtons,
  index,
  onRowClick,
}: ICardProps<T>) => {
  const { renderCell } = useTable();

  return (
    <div
      className={styles['card-container']}
      onClick={() => onRowClick?.(data)}
    >
      {columns.map((column) => (
        <div className={styles['card-item']} key={column.dataKey}>
          <span className={styles['card-label']}>
            {column.label ?? column.dataKey}:
          </span>
          <span className={styles['card-value']}>
            {renderCell(column, data)}
          </span>
        </div>
      ))}
      <ActionButtons data={data} index={index} actionButtons={actionButtons} />
    </div>
  );
};

export default Card;
