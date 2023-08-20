import { ChevronsUp } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';
import { PageBack } from '@/components/PageBack';

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

const InventoryCardDetailPage: NextPage = () => {
  const router = useRouter();
  const { cards } = useInventory();

  const [card, setCard] = useState<CardItem>();
  useEffect(() => {
    setCard(cards.filter((card) => card.id == router.query.cardId)[0]);
  }, [cards, router.query.cardId]);

  return (
    <div className="flex flex-col items-center">
      <PageBack />

      <div className="w-full max-w-[400px] flex justify-center object-contain my-5">
        <Image
          src={`/assets/${['B', 'A', 'S'][card?.rank || 0]}.png`}
          alt="등급"
          width="380"
          height="350"
          className="z-0 absolute"
        />
        <Image
          src={`http://d23ybff5p6c2tt.cloudfront.net/${card?.id}.png`}
          alt="카드"
          width="380"
          height="350"
        />
      </div>

      <div className="flex w-full">
        <div className="flex flex-col flex-1">
          <span
            className="text-3xl font-medium text-white"
            style={{ fontFamily: 'koverwatch' }}
          >
            {card?.name}
          </span>
          <span className="mt-2 text-md text-slate-400">{card?.address}</span>
          <p className="mt-2 leading-tight text-md text-slate-500">
            {card?.description}
          </p>

          <div className="flex justify-center gap-2 mt-4">
            <Link href="/cards/upgrade">
              <Button className="flex gap-1 px-8 items-top" price={500}>
                <ChevronsUp
                  size={18}
                  strokeWidth={3}
                  className="mt-0.5 ml-[-4px]"
                />
                <span>Upgrade</span>
              </Button>
            </Link>

            <Link href="/journeys/new" className="flex-1">
              <Button variant="secondary" className="w-full">
                Create a new Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCardDetailPage;
