import { IOption } from '@/interfaces';
import styles from './styles.module.scss';
import { IoMdClose } from 'react-icons/io';
import { RxCaretDown } from 'react-icons/rx';

export interface ISelectProps {
  label?: string;
  value: string | null;
  description?: string;
  placeholder?: string;
  id: string;
  options?: IOption[];
  searchType: 'textSearch' | 'include' | 'number';
  onChange: (value: string, id: string) => void;
}

const Select = ({
  label,
  value,
  description,
  placeholder,
  id,
  onChange,
  options,
}: ISelectProps) => {
  return (
    <div className={styles['select-container']}>
      {label && <label>{label}</label>}
      <select
        id={id}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value, id)}
      >
        <option value=''>{placeholder}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value ? (
        <div onClick={() => onChange('', id)} className={styles['close-icon']}>
          <IoMdClose size={15} />
        </div>
      ) : (
        <div className={styles['caret-icon']}>
          <RxCaretDown size={20} />
        </div>
      )}
      {description && <span>{description}</span>}
    </div>
  );
};

export default Select;
