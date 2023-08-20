/* eslint-disable @next/next/no-img-element */
import { Calendar, LocateIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { BusanBadge } from './BusanBadge';
import { Badge } from './ui/badge';

const DateBadge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
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
    <span className="font-medium text-slate-200">{children}</span>
  </span>
);

type JourneyItemProps = {
  vehicleName: string;
  vehicleSrc: string;
  // badgeSrc: string;
};
export const JourneyItem: React.FC<JourneyItemProps> = ({
  vehicleName,
  vehicleSrc,
  // badgeSrc,
}) => {
  return (
    <Link href="/journeys/1" className="w-full">
      <div className="flex flex-col gap-2 py-4">
        <div className="flex items-center gap-3">
          <img
            src={vehicleSrc}
            alt=""
            className="w-[64px] h-[64px] object-contain"
          />
          <div className="flex flex-col">
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'koverwatch' }}
            >
              {/* 기아 스포티지 | Kia Sportage */}
              {vehicleName}
            </span>

            <span className="flex items-center gap-2">
              <LocateIcon size={14} className="text-pink-400" />
              <BusanBadge />
            </span>
          </div>
        </div>

        <div className="flex items-center w-full gap-2 px-4 py-2 overflow-hidden text-sm rounded-md cursor-pointer bg-zinc-900 text-slate-200">
          <span className="w-10">From</span>
          <DateBadge>
            <Badge>부산역 | Busan Station</Badge> 20230816
          </DateBadge>
        </div>

        <div className="flex items-center w-full gap-2 px-4 py-2 overflow-hidden text-sm rounded-md cursor-pointer bg-zinc-900 text-slate-200">
          <span className="w-10">To</span>
          <DateBadge>
            <Badge>해운대해수욕장 | Haeundae Beach</Badge> 20230820
          </DateBadge>
        </div>
      </div>
    </Link>
  );
};
