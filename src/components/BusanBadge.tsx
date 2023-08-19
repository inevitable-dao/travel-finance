/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';

type BusanBadgeProps = {
  className?: string;
  small?: boolean;
};

export const BusanBadge: React.FC<BusanBadgeProps> = ({ small, className }) => {
  return (
    <span
      className={cn(
        'flex items-center justify-center h-6 px-3 py-3 text-base font-medium text-center text-pink-300 border-solid border-[1px] border-pink-100/10 rounded-full w-fit bg-slate-100',
        className,
      )}
      style={{
        background: `linear-gradient(90deg, rgb(255, 201, 225, 0.1) 0%, rgba(255, 138, 189, 0.3) 47.92%, rgb(255, 200, 224, 0.1) 100%)`,
      }}
    >
      <img
        src="/assets/busan.png"
        className={cn(
          'w-[14px] h-[14px] mr-1 inline-block',
          small && `w-[10px] h-[10px]`,
        )}
        alt=""
      />

      <span
        style={{
          fontFamily: 'koverwatch',
          lineHeight: 1,
          marginBottom: -2,
        }}
      >
        Busan Card Pack #1
      </span>
    </span>
  );
};
