import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { CardItem } from '@/components/CardItem';
import { PageTitle } from '@/components/PageTitle';

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
  const hasItems = true;

  const [cards, setCards] = useState<CardItem[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get<CommonResponse<{ cards: CardItem[] }>>(
        'https://stevejkang.jp.ngrok.io/users/me/cards',
        {
          headers: {
            'X-Inevitable-Auth-Key': localStorage.getItem('access_token'),
          },
        },
      );

      setCards(res.data.result.cards);
    };

    fetch();
  }, []);

  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="All cards">
        {hasItems ? (
          <>
            Inventory <span className="text-[#ff3084]">({cards.length})</span>
          </>
        ) : (
          'Inventory'
        )}
      </PageTitle>

      <div className="flex flex-col w-full">
        {cards.map((card) => (
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
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
