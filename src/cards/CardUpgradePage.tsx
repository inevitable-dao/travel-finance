import { NextPage } from 'next';
import React from 'react';

import { Button } from '@/components/Button';
import { PageBack } from '@/components/PageBack';

const CardUpgradePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageBack />

      {/* <div className="w-full max-w-[400px] bg-zinc-900 aspect-square" />

      <div className="flex">
        <div className="flex flex-col items-end flex-1 mt-2">
          <span className="text-base font-medium text-white">
            Busan Card Pack #1
          </span>
        </div>
      </div> */}

      <div className="flex justify-center w-full gap-2 mt-2">
        <Button>Upgrade</Button>
      </div>
    </div>
  );
};

export default CardUpgradePage;
