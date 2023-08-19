import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { CardItem } from '@/components/CardItem';
import { CardsEmpty } from '@/components/CardsEmpty';
import { LoginRequired } from '@/components/LoginRequired';
import { PageTitle } from '@/components/PageTitle';

import { useInventory } from './hooks/useInventory';

type CommonResponse<T> = {
  statusCode: number;
  timeStamp: string;
  path: string;
  result: T;
};

type CardItem = {
  id: string;
  type: string;
  name: string;
  description: string;
  address: string;
  estimatedHours: number;
  rank: number;
};

const InventoryPage: NextPage = () => {
  const { cards, hasAuthError } = useInventory();

  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="All cards">
        Inventory <span className="text-[#ff3084]">({cards.length})</span>
      </PageTitle>

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
    </div>
  );
};

export default InventoryPage;
