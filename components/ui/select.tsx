import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            {label}
            {props.required && <span className="text-alert-red ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-2 border rounded-md text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent transition-colors ${
            error ? 'border-alert-red' : 'border-light-gray'
          } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-alert-red">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-cool-gray">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
