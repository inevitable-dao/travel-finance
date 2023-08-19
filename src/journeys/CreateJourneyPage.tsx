import { NextPage } from 'next';
import React from 'react';

import { Button } from '@/components/Button';
import { DatePicker } from '@/components/DatePicker';
import { LoginRequired } from '@/components/LoginRequired';
import { PageTitle } from '@/components/PageTitle';
import { useInventory } from '@/inventory/hooks/useInventory';

const CreateJourneyPage: NextPage = () => {
  const { cards, hasAuthError } = useInventory();

  if (hasAuthError) {
    return (
      <div className="flex flex-col items-center mt-[64px]">
        <PageTitle description="Use your cards to plan your special journey">
          Create a new Journey
        </PageTitle>

        <LoginRequired />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="Use your cards to plan your special journey">
        Create a new Journey
      </PageTitle>

      <DatePicker />
      <DatePicker />

      <div className="flex justify-center w-full gap-2 mt-2">
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default CreateJourneyPage;
