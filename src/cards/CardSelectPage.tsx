import { NextPage } from 'next';
import React from 'react';

import { Button } from '@/components/Button';
import { PageTitle } from '@/components/PageTitle';

const CardSelectPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="Use your cards to plan your special journey">
        Travel
      </PageTitle>

      <div className="flex justify-center w-full gap-2 mt-2">
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default CardSelectPage;
