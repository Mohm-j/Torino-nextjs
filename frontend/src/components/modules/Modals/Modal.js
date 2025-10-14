import styles from "./Modal.module.css";

export default function Modal({ open, children }) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>{children}</div>
    </div>
  );
}
