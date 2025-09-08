import * as React from 'react';

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={`border p-2 ${className || ''}`} {...props}>
      {children}
    </select>
  )
);
Select.displayName = 'Select';
