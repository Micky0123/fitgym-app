import React from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  id: number | string;
  name: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, label, error, fullWidth = false, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        {/* <select
          className={cn(
            'flex h-10 w-full appearance-none rounded-md border border-slate-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            fullWidth && 'w-full',
            className
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        > */}
        <select
          className={cn(
            'flex h-10 w-full appearance-none rounded-md border border-slate-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
            'dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:focus:ring-blue-400 dark:focus:border-blue-400',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            fullWidth && 'w-full',
            className
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        >
          <option value="">בחר...</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;