import Button from '../../../../components/shared/button/Button';
import styles from './styles.module.scss';

export interface ITableHeaderProps {
  title?: string;
  dataTotal: number;
  addButtonText?: string;
  onAddButtonClick?: () => void;
}

const TableHeader = ({
  title,
  dataTotal,
  addButtonText,
  onAddButtonClick,
}: ITableHeaderProps) => {
  return (
    <div className={styles['table-header-container']}>
      <div className={styles['title-container']}>
        <span>{title}</span>
        <span>{dataTotal}</span>
      </div>
      {addButtonText && onAddButtonClick && (
        <div>
          <Button onClick={onAddButtonClick} text={addButtonText} />
        </div>
      )}
    </div>
  );
};

export default TableHeader;
