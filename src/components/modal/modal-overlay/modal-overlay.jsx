import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import styles from './modal-overlay.module.3css';

ModalOverlay.propTypes = {
  onModalClose: PropTypes.func.isRequired
};

export function ModalOverlay({onModalClose, children}){

  const handleOnKeyDown = (e) => {
    if (e.key === "Escape") {
      onModalClose()
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleOnKeyDown);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
    };
  });

  return (
    <div className={`${styles.container}`} onClick={onModalClose} onKeyDown={handleOnKeyDown}>
      {children}
    </div>
  );
}