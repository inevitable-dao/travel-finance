import axios from 'axios';
import { error } from 'console';
import { ChevronsUp } from 'lucide-react';
import { NextPage } from 'next';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/Button';
import { PageBack } from '@/components/PageBack';
import { useInventory } from '@/inventory/hooks/useInventory';

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

const CardUpgradePage: NextPage = () => {
  const { cards } = useInventory();
  const [newCard, setNewCard] = useState<CardItem>();

  const upgrade = useCallback(async () => {
    try {
      const res = await axios.post<CommonResponse<{ card: CardItem }>>(
        'https://stevejkang.jp.ngrok.io/cards/upgrade',
        {
          targetCardId: cards[0].id,
          sourceCardsId: [cards[1].id, cards[2].id],
        },
        {
          headers: {
            'X-Inevitable-Auth-Key': localStorage.getItem('access_token'),
          },
        },
      );

      setNewCard(res.data.result.card);
    } catch (e: any) {
      toast.error(e);
    }
  }, [cards]);

  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageBack description="To Card Detail" />

      <div className="flex flex-col w-full">
        <div className=""></div>
        <div className="flex w-full gap-4">
          <div className="flex-1 rounded-md bg-zinc-800">{newCard?.name}</div>
          <div className="flex-1 rounded-md bg-zinc-800">UPGRADE2</div>
        </div>
      </div>

      <div className="flex justify-center w-full gap-2 mt-2">
        <Button
          className="flex justify-center w-full gap-1 px-8 items-top"
          onClick={() => upgrade()}
          price={500}
        >
          <ChevronsUp size={18} strokeWidth={3} className="mt-0.5 ml-[-4px]" />
          <span>Upgrade</span>
        </Button>
      </div>
    </div>
  );
};

export default CardUpgradePage;
