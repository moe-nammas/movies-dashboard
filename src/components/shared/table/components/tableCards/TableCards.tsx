import styles from './styles.module.scss';
import Card from './Card';
import { ITableActionButton, ITableCell } from '@/interfaces';

export interface ITableCardsProps<T> {
  data: T[];
  columns: ITableCell<T>[];
  actionButtons?: ITableActionButton<T>[];
  onRowClick?: (row: T) => void;
}

const TableCards = <T,>({
  data,
  columns,
  actionButtons,
  onRowClick,
}: ITableCardsProps<T>) => {
  return (
    <div className={styles['cards-wrapper']}>
      {data.map((item, index) => (
        <Card
          onRowClick={onRowClick}
          key={index}
          data={item}
          columns={columns}
          actionButtons={actionButtons}
          index={index}
        />
      ))}
    </div>
  );
};

export default TableCards;
