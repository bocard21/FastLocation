import * as React from 'react';

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn('px-4 py-2 rounded bg-blue-600 text-white', className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';
