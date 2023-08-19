import { ChevronsUp } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/Button';
import { PageBack } from '@/components/PageBack';

const InventoryCardDetailPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <PageBack />

      <div className="w-full max-w-[400px] bg-zinc-900 aspect-square" />

      <div className="flex w-full">
        <div className="flex flex-col flex-1 mt-4">
          <span
            className="text-3xl font-medium text-white"
            style={{ fontFamily: 'koverwatch' }}
          >
            해운대 해수욕장 | Haeundae Beach
          </span>
          <span className="mt-2 text-md text-slate-400">
            부산광역시 해운대구
          </span>
          <p className="mt-2 leading-tight text-md text-slate-500">
            부산광역시 해운대구에 있는 해수욕장. 광안대교와 더불어 외지인들에게
            가장 유명한 부산광역시의 양대 랜드마크이다.
          </p>

          <div className="flex justify-center gap-2 mt-4">
            <Link href="/cards/upgrade">
              <Button className="flex gap-1 px-8 items-top">
                <ChevronsUp
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 ml-[-4px]"
                />
                <span>Upgrade</span>
              </Button>
            </Link>

            <Link href="/journeys/new" className="flex-1">
              <Button variant="secondary" className="w-full">
                Create a new Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCardDetailPage;
