import styles from "../styles/components/Modal.module.css";

function Modal(props) {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>{props.children}</div>
    </div>
  );
}

export default Modal;
