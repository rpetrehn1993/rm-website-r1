import React, { ReactNode, ElementType } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  as?: ElementType;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'quote';
  className?: string;
  children: ReactNode;
  [key: string]: any; // Allow any other props
}

const variantStyles = {
  h1: 'text-4xl font-light tracking-tight',
  h2: 'text-3xl font-light tracking-tight',
  h3: 'text-2xl font-light tracking-tight',
  body: 'text-base font-normal',
  small: 'text-sm font-normal',
  quote: 'text-xl font-normal italic font-serif',
};

const defaultElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  small: 'p',
  quote: 'blockquote',
};

export function Typography({
  as,
  variant = 'body',
  className,
  children,
  ...props
}: TypographyProps) {
  const Component = as || defaultElements[variant];
  
  return React.createElement(
    Component,
    {
      className: cn(
        variantStyles[variant],
        'text-[#1E1E1E]',
        className
      ),
      ...props,
    },
    children
  );
} 