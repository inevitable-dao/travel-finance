import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './Button';

const DateBadge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={cn('bg-zinc-800 py-1 px-2 rounded-md text-slate-200', className)}
    {...props}
  >
    <span className="font-medium text-slate-200">20210404</span>
  </span>
);

export const JourneyItem: React.FC = () => {
  return (
    <div className="flex w-full gap-2 p-1 overflow-hidden rounded-md bg-zinc-900 text-slate-200">
      From <DateBadge /> to <DateBadge />
      <Link href="/journeys/go">
        <Button>Go</Button>
      </Link>
    </div>
  );
};
