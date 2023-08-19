import { cn } from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'px-12 pt-2 pb-1.5 text-xl font-bold transition-all shadow-2xl',
        variant === 'primary' &&
          'bg-[#FF4999] hover:bg-[#ff3084] shadow-pink-600/40 hover:text-zinc-950 hover:shadow-pink-600/65',
        variant === 'secondary' &&
          'bg-slate-100 hover:bg-slate-200 shadow-slate-300/40 hover:text-zinc-950 hover:shadow-slate-300/65',
        className,
      )}
      style={{ fontFamily: 'koverwatch' }}
      {...props}
    />
  );
};
