import { Undo2 } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { Button } from '@/components/Button';
import { PageTitle } from '@/components/PageTitle';

const InventoryCardDetailPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <PageTitle>
        <span
          className="flex items-center gap-2 text-white transition-colors cursor-pointer pointer-events-auto hover:text-slate-400"
          onClick={router.back}
        >
          <Undo2 />
          Back
        </span>
      </PageTitle>

      <div className="w-full max-w-[400px] bg-zinc-900 aspect-square" />

      <div className="flex w-full">
        <div className="flex flex-col flex-1 mt-2">
          <span
            className="text-2xl font-medium text-white"
            style={{ fontFamily: 'koverwatch' }}
          >
            해운대 해수욕장 | Haeundae Beach
          </span>
          <span className="text-sm text-slate-400">부산광역시 해운대구</span>
          <p className="mt-2 text-sm text-slate-500">
            부산광역시 해운대구에 있는 해수욕장. 광안대교와 더불어 외지인들에게
            가장 유명한 부산광역시의 양대 랜드마크이다.
          </p>

          <div className="flex justify-center w-full gap-2 mt-2">
            <Link href="/cards/upgrade">
              <Button>Upgrade</Button>
            </Link>

            <Button variant="secondary">Select</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCardDetailPage;
