import { Anchor } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import colors from 'tailwindcss/colors';

import { BusanBadge } from '@/components/BusanBadge';
import { Button } from '@/components/Button';
import { JourneyItem } from '@/components/JourneyItem';
import { PageTitle } from '@/components/PageTitle';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const RecentJourneysPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="Use your cards to plan your special journey">
        My Journeys
      </PageTitle>

      <Link href="/" className="w-full">
        <Alert
          className="w-full p-4 pt-3 transition-colors border-2 border-pink-300 border-solid cursor-pointer hover:border-pink-400"
          style={{
            background: `radial-gradient(15% 45% at 60% 5%,
            rgba(195, 231, 254, 0.675) 0%, rgba(195, 254, 250, 0) 100%),
            radial-gradient(25% 85% at 65% 65%,
              rgba(255, 217, 252, 0.9) 0%, rgba(217, 221, 255, 0) 100%),
            radial-gradient(35% 75% at 30% 95%,
              rgba(179, 242, 255, 0.9) 0%, rgba(179, 247, 255, 0) 100%),
            linear-gradient(rgb(254, 195, 236) 0%, rgb(236, 248, 255) 100%)`,
          }}
        >
          <Anchor
            className="w-4 h-4"
            strokeWidth={3}
            style={{ color: colors.blue[950] }}
          />
          <AlertTitle
            className="font-bold leading-none text-blue-950"
            style={{ fontFamily: 'koverwatch' }}
          >
            Purchase the new{' '}
            <span className="inline-flex align-middle border border-pink-300 border-solid bg-pink-50 rounded-2xl w-fit">
              <BusanBadge
                className="text-[#FF4999] text-sm px-2 py-1 align-sub"
                small
              />
            </span>{' '}
            pack to add new cards to your collection!
          </AlertTitle>
          <AlertDescription
            className="font-medium leading-none text-slate-600"
            style={{ fontFamily: 'koverwatch' }}
          >
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </Link>

      <div className="flex flex-col w-full gap-2 mt-4">
        <JourneyItem
          vehicleName="Kia Sportage | 기아 스포티지"
          vehicleSrc="/assets/cards/mockup-001.png"
        />
        <JourneyItem
          vehicleName="Kia Carnival | 기아 카니발"
          vehicleSrc="/assets/cards/mockup-002.png"
        />
        <JourneyItem
          vehicleName="Tesla Model X | 테슬라 모델 X"
          vehicleSrc="/assets/cards/mockup-003.png"
        />
      </div>

      <div className="fixed bottom-[68px] p-4 pb-2 bg-black/40 backdrop-blur-sm left-0 right-0 max-w-2xl mx-auto">
        <Link href="/journeys/new" className="w-full mt-4">
          <Button className="w-full">New</Button>
        </Link>
      </div>
    </div>
  );
};

export default RecentJourneysPage;
