import { ITableActionButton, ITableCell } from '@/interfaces';
import styles from './styles.module.scss';
import { useTable } from '@hooks/useTable';
import ActionButtons from '../tableActionButtons/ActionButtons';

export interface ITableBodyProps<T> {
  data: T[];
  columns: ITableCell<T>[];
  actionButtons?: ITableActionButton<T>[];
  selectable?: boolean;
  onRowClick?: (row: T) => void;
}

const TableBody = <T,>({
  data,
  columns,
  actionButtons,
  onRowClick,
}: ITableBodyProps<T>) => {
  const { renderCell } = useTable();

  return (
    <table className={styles['table-wrapper']}>
      {/* TABLE HEADERS */}
      <thead>
        <tr className={styles['table-header-row']}>
          {columns.map((column) => (
            <th key={column.key ?? column.dataKey}>
              {column.label ?? column.dataKey}
            </th>
          ))}
          {actionButtons && actionButtons?.length > 0 && (
            <th style={{ width: '30px' }}>Actions</th>
          )}
        </tr>
      </thead>
      {/* TABLE DATA */}
      <tbody>
        {data.map((row, index) => (
          <tr
            className={styles['table-data-row']}
            key={index}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((cell) => renderCell<T>(cell, row, data))}
            {actionButtons && (
              <ActionButtons
                actionButtons={actionButtons}
                data={row}
                index={index}
              />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBody;
