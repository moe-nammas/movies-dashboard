import styles from './styles.module.scss';

export interface IInputProps {
  label?: string;
  value: string | null;
  description?: string;
  placeholder?: string;
  id: string;
  debounce?: number;
  searchType: 'textSearch' | 'include' | 'number';
  onChange: (value: string, id: string) => void;
}

const Input = ({
  label,
  value,
  description,
  placeholder,
  id,
  onChange,
}: IInputProps) => {
  return (
    <div className={styles['input-container']}>
      {label && <label>{label}</label>}
      <input
        type='text'
        id={id}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value, id)}
      />
      {description && <span>{description}</span>}
    </div>
  );
};

export default Input;
