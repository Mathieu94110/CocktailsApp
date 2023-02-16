import { ToastProps } from 'interfaces';
import styles from './Toast.module.scss';

export const Toast = ({ title, content, type = 'default' }: ToastProps) => {
  return (
    <div className={ `${styles.toast} ${styles[type]}`}>
      { title && (
        <p>
          <strong>{title}</strong>
        </p>
      )}
      <p>{content}</p>
    </div>
  );
};
