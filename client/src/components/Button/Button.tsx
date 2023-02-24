import { PropsWithChildren } from 'react';

interface MyButtonProps {
  className?: string;
}
export const Button = (
  props: PropsWithChildren<MyButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>
) => {
  const { children, className, ...rest } = props;
  return (
    <button className={`mr-5 btn ${className}`} {...rest}>
      {children}
    </button>
  );
};
