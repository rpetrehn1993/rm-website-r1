import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
}

export function Card({ 
  className, 
  variant = 'default', 
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6',
        {
          'bg-white': variant === 'default',
          'bg-white border border-[#1E1E1E]': variant === 'bordered',
          'bg-white shadow-lg': variant === 'elevated',
        },
        className
      )}
      {...props}
    />
  );
} 