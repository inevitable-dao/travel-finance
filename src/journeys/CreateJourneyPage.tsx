import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';
import { CardsEmpty } from '@/components/CardsEmpty';
import { DatePicker } from '@/components/DatePicker';
import { LoginRequired } from '@/components/LoginRequired';
import { PageTitle } from '@/components/PageTitle';
import { useInventory } from '@/inventory/hooks/useInventory';

enum Stage {
  SELECT_DATE,
  SELECT_CARDS,
  SELECT_ORDER,
}

const CreateJourneyPage: NextPage = () => {
  const { cards, hasAuthError } = useInventory();

  const [stage, setStage] = useState<Stage>(Stage.SELECT_DATE);

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

      {stage === Stage.SELECT_DATE && (
        <div>
          <DatePicker />
          <DatePicker />
        </div>
      )}

      {stage === Stage.SELECT_CARDS && (
        <div className="flex flex-col w-full">
          {hasAuthError ? (
            <LoginRequired />
          ) : cards.length === 0 ? (
            <CardsEmpty />
          ) : (
            cards.map((card) => (
              // eslint-disable-next-line react/jsx-key
              <Link href={`/inventory/${card.id}`}>
                <CardItem
                  card={''}
                  name={card.name}
                  type={card.type}
                  address={card.address}
                  rank={card.rank}
                />
              </Link>
            ))
          )}
        </div>
      )}

      <div className="flex justify-center w-full gap-2 mt-2">
        <Button variant="secondary">Previous</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default CreateJourneyPage;
