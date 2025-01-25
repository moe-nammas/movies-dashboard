import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { IoMdClose } from 'react-icons/io';

export interface IModalProps {
  title?: string;
  children?: React.ReactNode | React.ReactNode[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ title, children, showModal, setShowModal }: IModalProps) => {
  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, []);

  return (
    showModal && (
      <div className={styles['modal-container']}>
        <div className={styles['modal-content']}>
          <div className={styles['modal-header']}>
            {title && <h2 className={styles['modal-title']}>{title}</h2>}
            <div
              className={styles['close-icon']}
              onClick={() => setShowModal(false)}
            >
              <IoMdClose size={20} />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
