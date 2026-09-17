import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: 'none' | 'orange' | 'cyan' | 'purple' | 'red';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = 'none',
  hoverEffect = true,
  ...props
}) => {
  const glowStyles = {
    none: '',
    orange: 'border-orange-500/25 shadow-[0_0_25px_rgba(255,94,0,0.14)]',
    cyan: 'border-cyan-500/25 shadow-[0_0_25px_rgba(0,240,255,0.14)]',
    purple: 'border-purple-500/25 shadow-[0_0_25px_rgba(139,92,246,0.14)]',
    red: 'border-rose-500/25 shadow-[0_0_25px_rgba(244,63,94,0.14)]',
  };

  return (
    <div
      className={twMerge(
        'glass-card rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
        hoverEffect && 'glass-card-hover hover:border-orange-500/40',
        glowStyles[glow],
        className
      )}
      {...props}
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      {children}
    </div>
  );
};
