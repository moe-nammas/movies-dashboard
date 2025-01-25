import { ITableCell } from '@/interfaces';
import { ReactElement } from 'react';

export function useTable() {
  const renderCell = <T,>(
    cell: ITableCell<T>,
    row: T,
    data: T[] = []
  ): ReactElement => {
    if (cell.render)
      return <td key={cell.key ?? cell.dataKey}>{cell.render(row, data)}</td>;
    return (
      <td key={cell.key ?? cell.dataKey}>
        {cell?.formattor
          ? // @ts-expect-error ...
            cell.formattor(row[cell.dataKey])
          : // @ts-expect-error ...
            row[cell.dataKey]}
      </td>
    );
  };

  return {
    renderCell,
  };
}
