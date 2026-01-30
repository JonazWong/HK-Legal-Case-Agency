'use client';

import React from 'react';
import { Card } from './card';

export interface TrendData {
  value: number;
  isPositive: boolean;
  label?: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: TrendData;
  description?: string;
  color?: 'teal' | 'green' | 'blue' | 'gold' | 'red';
  miniChart?: React.ReactNode;
  className?: string;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, icon, trend, description, color = 'teal', miniChart, className = '' }, ref) => {
    const colorClasses = {
      teal: {
        iconBg: 'bg-teal-100',
        iconColor: 'text-teal-600',
        gradient: 'from-teal-50 to-white',
      },
      green: {
        iconBg: 'bg-green-100',
        iconColor: 'text-success-green',
        gradient: 'from-green-50 to-white',
      },
      blue: {
        iconBg: 'bg-blue-100',
        iconColor: 'text-info-blue',
        gradient: 'from-blue-50 to-white',
      },
      gold: {
        iconBg: 'bg-yellow-100',
        iconColor: 'text-subtle-gold',
        gradient: 'from-yellow-50 to-white',
      },
      red: {
        iconBg: 'bg-red-100',
        iconColor: 'text-alert-red',
        gradient: 'from-red-50 to-white',
      },
    };

    const colors = colorClasses[color];

    return (
      <Card
        ref={ref}
        variant="hover-lift"
        shadow="soft"
        className={`bg-gradient-to-br ${colors.gradient} ${className}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-cool-gray mb-2">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-4xl font-bold text-charcoal">{value}</p>
              {trend && (
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-sm font-semibold ${
                      trend.isPositive ? 'text-success-green' : 'text-alert-red'
                    }`}
                  >
                    {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                  </span>
                  {trend.label && (
                    <span className="text-xs text-cool-gray">{trend.label}</span>
                  )}
                </div>
              )}
            </div>
            {description && (
              <p className="text-sm text-cool-gray mt-2">{description}</p>
            )}
          </div>
          {icon && (
            <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center ${colors.iconColor} flex-shrink-0`}>
              {icon}
            </div>
          )}
        </div>
        {miniChart && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {miniChart}
          </div>
        )}
      </Card>
    );
  }
);

StatCard.displayName = 'StatCard';
