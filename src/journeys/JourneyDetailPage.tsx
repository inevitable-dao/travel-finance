/* eslint-disable @next/next/no-img-element */
import { UserCircle2 } from 'lucide-react';
import { NextPage } from 'next';
import React from 'react';

import { Button } from '@/components/Button';
import { PageTitle } from '@/components/PageTitle';
import { Badge } from '@/components/ui/badge';

const JourneyDetailPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="Use your cards to plan your special journey">
        Journey Details
      </PageTitle>

      <div className="relative flex justify-center w-full max-w-lg py-6 rounded-md bg-zinc-900">
        <div className="absolute flex items-center -top-4 -left-4">
          <img
            src="/assets/cards/badge-b.png"
            alt=""
            className="w-[84px] h-[84px] object-contain z-10"
          />
          <img
            src="/assets/cards/mockup-001.png"
            alt=""
            className="w-[84px] h-[84px] object-contain -ml-[40px]"
          />
        </div>
        <img
          src="/assets/16275402050AtFcpix0U.avif"
          alt="Go"
          className="w-[300px]"
        />
      </div>

      <div className="relative flex justify-center w-full max-w-lg gap-3 px-4 py-4 mt-2 rounded-md bg-zinc-800">
        <UserCircle2 size={48} strokeWidth={1} />
        <div className="flex flex-col justify-center flex-1 gap-1">
          <span className="flex items-center font-medium text-left text-slate-50">
            Taeyang Kim <Badge className="ml-1">PRO</Badge>
          </span>
          <div className="flex items-center gap-3">
            <span className="font-medium text-left text-slate-300">
              12가 1234
            </span>
            <span className="font-medium text-left text-slate-400">
              Kia Sportage | 기아 스포티지
            </span>
          </div>
        </div>
      </div>

      <h2
        className="mt-8 text-4xl font-medium text-center text-white"
        style={{ fontFamily: 'koverwatch' }}
      >
        Your ride has been <br />
        scheduled with a driver.
      </h2>

      <div className="flex justify-center w-full max-w-xs gap-2 mt-3">
        <Button className="flex-1 px-0" variant="secondary">
          Pickup Info
        </Button>
        <Button className="flex-1 px-0">Details</Button>
      </div>
    </div>
  );
};

export default JourneyDetailPage;
