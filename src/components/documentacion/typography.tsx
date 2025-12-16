import { cn } from '@/lib/utils';
import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function TypographyH1({ children, id }: TypographyProps) {
  return (
    <h1
      id={id ? id : null}
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ children, id }: TypographyProps) {
  return (
    <h2
      id={id ? id : null}
      className="scroll-m-20 text-xl font-semibold tracking-tight"
    >
      {children}
    </h2>
  );
}

export function TypographyP({ children }: TypographyProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographyOl({ children }: TypographyProps) {
  return <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>;
}

export function TypographyBlockquote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
}
