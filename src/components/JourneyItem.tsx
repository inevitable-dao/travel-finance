import { Calendar } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const DateBadge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={cn(
      'bg-zinc-800 py-1 px-2 rounded-md text-slate-200 flex items-center text-sm gap-1',
      className,
    )}
    {...props}
  >
    <Calendar size={16} />
    <span className="font-medium text-slate-200">20210404</span>
  </span>
);

export const JourneyItem: React.FC = () => {
  return (
    <Link href="/journeys/1" className="w-full">
      <div className="flex items-center w-full gap-2 px-4 py-2 overflow-hidden text-sm rounded-md cursor-pointer bg-zinc-900 text-slate-200">
        From <DateBadge /> to <DateBadge />
      </div>
    </Link>
  );
};
