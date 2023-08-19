/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React from 'react';

import { Button } from '@/components/Button';
import { PageTitle } from '@/components/PageTitle';

const GoJourneyPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="Use your cards to plan your special journey">
        Go
      </PageTitle>

      <h2 className="text-center text-white">
        Your ride has been scheduled with a driver.
      </h2>
      <div className="flex justify-center w-full gap-2 mt-2">
        <Button>Next</Button>
      </div>

      <img
        src="/assets/16786721655C3l9av8y9.avif"
        alt="Go"
        className="w-[300px]"
      />
    </div>
  );
};

export default GoJourneyPage;
