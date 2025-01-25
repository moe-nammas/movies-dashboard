import { IFilter } from '@/interfaces';
import styles from './styles.module.scss';
import Input from '@components/shared/input/Input';
import Select from '../select/Select';

export interface IFiltersProps {
  filters: IFilter[];
  onChange: (value: string, id: string) => void;
}
const Filters = ({ filters, onChange }: IFiltersProps) => {
  const renderFilters = (filter: IFilter) => {
    const props = {
      ...filter,
      onChange: onChange,
    };

    switch (filter.type) {
      case 'select':
        return <Select {...props} key={filter.id} />;
      case 'input':
        return <Input {...props} key={filter.id} />;
    }
  };

  return (
    <div className={styles['filters-container']}>
      {filters.map((item) => renderFilters(item))}
    </div>
  );
};

export default Filters;
