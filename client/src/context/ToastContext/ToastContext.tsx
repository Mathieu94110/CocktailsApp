import {
  createContext,
  useContext,
  PropsWithChildren,
  useRef,
  useState,
  useCallback,
} from 'react';
import { ToastParams, ToastItem } from 'interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { Toast } from './Components/Toast';
import styles from './ToastContext.module.scss';

const defaultPush = (toast: ToastParams) => {};

const defaultValue = {
  pushToastRef: { current: (toast: ToastParams) => {} },
};

const ToastContext = createContext(defaultValue);

export const useToasts = () => {
  const { pushToastRef } = useContext(ToastContext);
  return {
    pushToast: useCallback(
      (toast: ToastParams) => {
        pushToastRef.current(toast);
      },
      [pushToastRef]
    ),
  };
};

const Toasts = () => {
  const [toasts, setToasts] = useState([] as ToastItem[]);
  const { pushToastRef } = useContext(ToastContext);
  pushToastRef.current = ({ duration, ...props }: ToastParams) => {
    const id = Date.now();
    const timer = setTimeout(() => {
      setToasts((v) => v.filter((t) => t.id !== id));
    }, (duration ?? 2) * 1000);
    const toast = { ...props, id, timer };
    setToasts((v) => [...v, toast]);
  };

  const onRemove = (toast: ToastItem) => {
    clearTimeout(toast.timer);
    setToasts((v) => v.filter((t) => t !== toast));
  };

  return (
    <div className={styles.toastContainer}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            onClick={() => onRemove(toast)}
            key={toast.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
          >
            <Toast {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const ToastContextProvider = ({ children }: PropsWithChildren) => {
  const pushToastRef = useRef(defaultPush);
  return (
    <ToastContext.Provider value={{ pushToastRef }}>
      <Toasts />
      {children}
    </ToastContext.Provider>
  );
};
