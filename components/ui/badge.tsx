import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gradient' | 'pulse';
  icon?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', icon, className = '', children, ...props }, ref) => {
    const variants = {
      default: 'bg-light-gray text-charcoal',
      success: 'bg-success-green text-white',
      warning: 'bg-subtle-gold text-charcoal',
      danger: 'bg-alert-red text-white',
      info: 'bg-info-blue text-white',
      gradient: 'bg-gradient-to-r from-teal-500 to-mint-green text-white shadow-glow',
      pulse: 'bg-mint-green text-white animate-pulse-slow',
    };
    
    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
        {...props}
      >
        {icon && <span className="w-3 h-3">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
