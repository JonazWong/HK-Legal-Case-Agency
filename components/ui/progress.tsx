import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    value, 
    max = 100, 
    variant = 'default', 
    size = 'md', 
    showLabel = false,
    animated = false,
    className = '', 
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const variants = {
      default: 'bg-teal-500',
      success: 'bg-success-green',
      warning: 'bg-subtle-gold',
      danger: 'bg-alert-red',
      info: 'bg-info-blue',
    };

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        <div className={`w-full ${sizes[size]} bg-light-gray rounded-full overflow-hidden`}>
          <div
            className={`${sizes[size]} ${variants[variant]} rounded-full transition-all duration-500 ${
              animated ? 'animate-pulse' : ''
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <span className="text-xs text-cool-gray mt-1 block">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
