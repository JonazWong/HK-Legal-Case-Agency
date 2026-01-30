import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'rectangular', width, height, className = '', ...props }, ref) => {
    const variants = {
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    };

    const style: React.CSSProperties = {
      width: width || (variant === 'circular' ? '40px' : '100%'),
      height: height || (variant === 'text' ? '16px' : variant === 'circular' ? '40px' : '100px'),
    };

    return (
      <div
        ref={ref}
        className={`animate-pulse bg-gradient-to-r from-light-gray via-gray-200 to-light-gray bg-shimmer ${variants[variant]} ${className}`}
        style={style}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export const SkeletonCard = () => (
  <div className="bg-white border border-light-gray rounded-xl p-8 space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" height="32px" />
      </div>
      <Skeleton variant="circular" width="48px" height="48px" />
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} variant="text" width={i === lines - 1 ? '75%' : '100%'} />
    ))}
  </div>
);
