import * as React from 'react';
import { Toast } from 'context/ToastContext/Components/Toast';

export type ToastProps = {
  title?: string;
  content: string;
  type?: 'success' | 'danger' | 'default';
};

export type ToastParams = React.ComponentProps<typeof Toast> & {
  duration?: number;
};

export type ToastItem = React.ComponentProps<typeof Toast> & {
  id: number;
  timer: ReturnType<typeof setTimeout>;
};
