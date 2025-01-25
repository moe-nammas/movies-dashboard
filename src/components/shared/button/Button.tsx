import { ReactElement } from 'react';
import styles from './styles.module.scss';

export interface IButtonProps {
  text: string;
  icon?: ReactElement;
  type?: 'button' | 'submit' | 'reset';
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({
  text,
  icon,
  type = 'button',
  onClick,
  disabled = false,
}: IButtonProps) => {
  return (
    <button
      className={styles['button']}
      type={type}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Button;
