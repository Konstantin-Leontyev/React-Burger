import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from "react-router-dom";
import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay';

type TModalProps = {
  children: React.JSX.Element;
  closeIcon?: boolean;
  onClose?: () => void;
  title?: string;
};

const modalRoot = document.getElementById('react-modals') as HTMLElement;

export function Modal({ title, children, onClose, closeIcon = true }: TModalProps): React.JSX.Element {
  const navigate = useNavigate();
  function onModalClose(): void {
    if (onClose) {
      onClose();
    }
    navigate('/');
  }

  useEffect(() => {
    function handleOnKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onModalClose();
      }
    }
    document.addEventListener('keydown', handleOnKeyDown,);
    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  return createPortal(
    (
      <div className={styles.wrapper}>
        <ModalOverlay onClose={onModalClose}/>
        <div className={styles.modal}>
          <span className={`${styles.span} text text_type_main-large ml-10 mt-10 mr-10`}>
            <div className={styles.title}>{title}</div>
            {
              closeIcon &&
              <div className={styles.closeIcon}>
                <CloseIcon type="primary" onClick={onModalClose}/>
              </div>
            }
          </span>
            {children}
        </div>
      </div>
    ),
    modalRoot
  );
}
