import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
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

enum Stage {
  COVER = 'COVER',
  RESULT = 'RESULT',
}

const CardOpenPage: NextPage = () => {
  const [stage, setStage] = useState<Stage>(Stage.COVER);

  const [cards, setCards] = useState<CardItem[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post<CommonResponse<{ cards: CardItem[] }>>(
        'https://stevejkang.jp.ngrok.io/card-packages/1',
        undefined,
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
      <PageTitle subtitle="Busan Card Pack #1">Open</PageTitle>

      {stage === Stage.COVER && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 mt-4">
          <div className="w-full max-w-[400px] bg-zinc-900 aspect-square relative z-0"></div>

          <Button
            onClick={() => {
              setStage(Stage.RESULT);
            }}
          >
            Touch to Open
          </Button>
        </div>
      )}

      {stage === Stage.RESULT && (
        <div>
          <h2
            className="text-3xl font-medium text-white"
            style={{ fontFamily: 'koverwatch' }}
          >
            Results
          </h2>
          {cards.map((card) => (
            // eslint-disable-next-line react/jsx-key
            <div className="my-2">
              <CardItem
                card={''}
                name={card.name}
                type={card.type}
                address={card.address}
                rank={card.rank}
              />
            </div>
          ))}
          <div className="flex justify-center w-full gap-2 mt-4">
            <Link href="/inventory">
              <Button>Inventory</Button>
            </Link>

            <Button
              variant="secondary"
              onClick={() => {
                setStage(Stage.COVER);
              }}
            >
              Open Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardOpenPage;
