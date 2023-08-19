import { ChevronsUp } from 'lucide-react';
import { NextPage } from 'next';
import React from 'react';

import { Button } from '@/components/Button';
import { PageBack } from '@/components/PageBack';

const CardUpgradePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageBack description="To Card Detail" />

      <div className="flex justify-center w-full gap-2 mt-2">
        <Button className="flex gap-1 px-8 items-top">
          <ChevronsUp size={18} strokeWidth={3} className="mt-0.5 ml-[-4px]" />
          <span>Upgrade</span>
        </Button>
      </div>
    </div>
  );
};

export default CardUpgradePage;
