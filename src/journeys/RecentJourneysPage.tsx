import { NextPage } from 'next';
import React from 'react';

import { PageTitle } from '@/components/PageTitle';

const RecentJourneysPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="Use your cards to plan your special journey">
        My Journeys
      </PageTitle>
    </div>
  );
};

export default RecentJourneysPage;
