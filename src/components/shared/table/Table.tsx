import { ITableActionButton, ITableCell } from '@/interfaces';
import TableHeader from './components/TableHeader';
import styles from './styles.module.scss';
import TableBody from './components/tableBody/TableBody';
import { useWindowSize } from '@/hooks/useWindowSize';
import TableCards from './components/tableCards/TableCards';

export interface ITableProps<T> {
  data: T[];
  columns: ITableCell<T>[];
  actionButtons?: ITableActionButton<T>[];
  title: string;
  addButtonText?: string;
  onAddButtonClick?: () => void;
  onRowClick?: (row: T) => void;
}

const Table = <T,>({
  title,
  addButtonText,
  onAddButtonClick,
  data,
  columns,
  actionButtons,
  onRowClick,
}: ITableProps<T>) => {
  const { width } = useWindowSize();

  return (
    <div className={styles['table-container']}>
      <TableHeader
        title={title}
        addButtonText={addButtonText}
        onAddButtonClick={onAddButtonClick}
        dataTotal={data.length}
      />
      {data.length > 0 ? (
        width > 768 ? (
          <TableBody
            columns={columns}
            data={data}
            actionButtons={actionButtons}
            onRowClick={onRowClick}
          />
        ) : (
          <TableCards
            columns={columns}
            data={data}
            actionButtons={actionButtons}
            onRowClick={onRowClick}
          />
        )
      ) : (
        <div className={styles['no-data-available']}>No Data Available :(</div>
      )}
    </div>
  );
};

export default Table;
