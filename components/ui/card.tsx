import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient' | 'glass' | 'hover-lift';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'soft' | 'medium' | 'strong';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', shadow, className = '', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-light-gray',
      bordered: 'bg-white border-2 border-teal-dark',
      elevated: 'bg-white shadow-medium',
      gradient: 'bg-gradient-to-br from-white to-teal-50 border border-teal-100',
      glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
      'hover-lift': 'bg-white border border-light-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-strong',
    };

    const shadows = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
      soft: 'shadow-soft',
      medium: 'shadow-medium',
      strong: 'shadow-strong',
    };
    
    const shadowClass = shadow ? shadows[shadow] : '';
    
    return (
      <div
        ref={ref}
        className={`rounded-xl p-8 ${variants[variant]} ${shadowClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-xl font-semibold text-charcoal ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-cool-gray text-sm mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mt-6 pt-4 border-t border-light-gray ${className}`} {...props}>
    {children}
  </div>
);
