/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';

export type BadgeProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Badge: React.FC<BadgeProps> = ({ children }) => (
  <span className="absolute left-0 right-0 w-full rounded-full -bottom-3">
    <span className="-mr-2 flex items-center justify-center pl-1 pr-2 pt-1 pb-0.5 ml-auto text-sm font-bold text-slate-900 bg-slate-50 w-fit rounded-2xl">
      {children}
    </span>
  </span>
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  price?: number;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  price,
  children,
  onPointerCancel,
  style,
  ...props
}) => {
  return (
    <button
      className={cn(
        'px-12 pt-2 pb-1.5 text-xl font-bold transition-all shadow-2xl relative',
        variant === 'primary' &&
          'bg-[#FF4999] hover:bg-[#ff3084] shadow-pink-600/40 hover:text-zinc-950 hover:shadow-pink-600/65',
        variant === 'secondary' &&
          'bg-slate-100 hover:bg-slate-200 shadow-slate-300/40 hover:text-zinc-950 hover:shadow-slate-300/65',
        className,
      )}
      style={{ fontFamily: 'koverwatch', ...style }}
      {...props}
    >
      {children}
      {typeof price !== 'undefined' && (
        <Badge>
          <img
            src="/assets/coin.png"
            className="mb-0.5 inline-block w-[16px] h-[16px]"
            alt=""
          />
          <span>{price}</span>
        </Badge>
      )}
    </button>
  );
};
