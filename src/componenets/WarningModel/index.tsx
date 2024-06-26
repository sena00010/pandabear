import React from 'react';
import styles from './warningModel.module.css'; 

interface props{
    isOpen:boolean;
    onDelete:void;
    onCancel:any;
}

const DeleteWarningModal = ({ isOpen, onDelete, onCancel }:props) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <h2>Are you sure you want to delete this item?</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.deleteButton} onClick={()=>onDelete}>Delete</button>
          <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarningModal;
