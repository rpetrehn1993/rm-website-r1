import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  className,
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[#1E1E1E]">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full rounded-lg border border-[#1E1E1E] bg-white px-4 py-2 text-[#1E1E1E]',
          'focus:outline-none focus:ring-2 focus:ring-[#1E1E1E] focus:ring-opacity-50',
          'placeholder:text-[#999999]',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 