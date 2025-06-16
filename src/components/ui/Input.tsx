import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, fullWidth = false, icon, ...props }, ref) => {
    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          {/* <input
            className={cn(
              'flex h-10 w-full rounded-md border border-slate-300 bg-white py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              fullWidth && 'w-full',
              className
            )}
            ref={ref}
            {...props} */}
            <input
            className={cn(
              'flex h-10 w-full rounded-md border border-slate-300 bg-white py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
              'dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:border-slate-600 dark:focus:ring-blue-400 dark:focus:border-blue-400',
              icon && 'pl-10',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              fullWidth && 'w-full',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;