import React from 'react';
import { clsx } from 'clsx';

interface GlowBadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'green' | 'red' | 'blue' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
  icon?: React.ReactNode;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
  children,
  variant = 'orange',
  size = 'md',
  pulse = false,
  icon,
}) => {
  const variantClasses = {
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_12px_rgba(255,94,0,0.2)]',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]',
    blue: 'bg-sky-500/10 text-sky-400 border-sky-500/30 shadow-[0_0_12px_rgba(14,165,233,0.2)]',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full font-mono tracking-wide',
    md: 'text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase',
  };

  const pulseDotColors = {
    orange: 'bg-orange-400',
    green: 'bg-emerald-400',
    red: 'bg-rose-400',
    blue: 'bg-sky-400',
    purple: 'bg-purple-400',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 border backdrop-blur-md transition-all duration-300',
        variantClasses[variant],
        sizeClasses[size]
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={clsx('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', pulseDotColors[variant])} />
          <span className={clsx('relative inline-flex rounded-full h-2 w-2', pulseDotColors[variant])} />
        </span>
      )}
      {icon && <span className="text-current">{icon}</span>}
      {children}
    </span>
  );
};
