import axios from 'axios';
import { ChevronsUp } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';
import { CardsEmpty } from '@/components/CardsEmpty';
import { LoginRequired } from '@/components/LoginRequired';
import { PageBack } from '@/components/PageBack';
import { Checkbox } from '@/components/ui/checkbox';
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
  const { cards, hasAuthError } = useInventory();
  const [newCard, setNewCard] = useState<CardItem>();

  const router = useRouter();
  const targetCardId = parseInt((router.query.baseCardId as string) || '');

  const targetCard = useMemo(() => {
    if (!targetCardId) {
      return null;
    }
    return cards.filter(
      (card) => card.id.toString() == targetCardId.toString(),
    )[0];
  }, [cards, targetCardId]);

  const renderedInventory = useMemo(() => {
    // if targetCard is available, remove it from inventory
    if (targetCard) {
      return cards.filter(
        (card) => card.id.toString() !== targetCard.id.toString(),
      );
    }
    return cards;
  }, [cards, targetCard]);

  const [selectedSacrificeIds, setSelectedSacrificeIds] = useState<string[]>(
    [],
  );

  const upgradeDisabled = !(
    selectedSacrificeIds.length < 3 && selectedSacrificeIds.length > 0
  );

  const upgrade = useCallback(async () => {
    try {
      const res = await axios.post<CommonResponse<{ card: CardItem }>>(
        'https://stevejkang.jp.ngrok.io/cards/upgrade',
        {
          targetCardId,
          sourceCardsId: selectedSacrificeIds.map((v) => parseInt(v)),
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
  }, [selectedSacrificeIds, targetCardId]);

  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageBack description="To Card Detail" />

      <div className="flex flex-col w-full">
        <div className=""></div>
        <div className="flex w-full gap-4">
          <div className="flex-1 rounded-md bg-zinc-800">
            <div className="w-full max-w-[200px] flex justify-center object-contain my-5 relative mx-auto">
              <Image
                src={`/assets/${['B', 'A', 'S'][targetCard?.rank || 0]}.png`}
                alt="등급"
                width="380"
                height="350"
                className="absolute top-0 bottom-0 left-0 right-0 z-0"
              />
              <Image
                src={`http://d23ybff5p6c2tt.cloudfront.net/${targetCard?.id}.png`}
                alt="카드"
                width="380"
                height="350"
                className="w-full"
              />
            </div>

            <div className="flex flex-col flex-1 px-5 pb-6">
              <span
                className="text-3xl font-medium text-white"
                style={{ fontFamily: 'koverwatch' }}
              >
                {targetCard?.name || 'Unknown'}
              </span>
              {targetCard?.address && (
                <span className="mt-2 text-md text-slate-400">
                  {targetCard.address}
                </span>
              )}
              {targetCard?.description && (
                <p className="mt-2 leading-tight text-md text-slate-500">
                  {targetCard.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex-1 rounded-md bg-zinc-800">
            <div className="p-5 flex flex-col w-max">
              <h3 className="text-3xl" style={{ fontFamily: 'koverwatch' }}>
                SELECT CARDS TO BURN🔥
              </h3>
              <span className="text-slate-400 self-baseline">Up to 2</span>
            </div>

            <div className="flex flex-col w-full h-[620px] overflow-scroll">
              {hasAuthError ? (
                <LoginRequired />
              ) : cards.length === 0 ? (
                <CardsEmpty />
              ) : (
                renderedInventory.map((card) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className="flex flex-row gap-3 w-full">
                    <Checkbox
                      className="self-center justify-self-center"
                      id={`card-${card.id}`}
                      checked={selectedSacrificeIds.includes(
                        card.id.toString(),
                      )}
                      onCheckedChange={() =>
                        setSelectedSacrificeIds((prev) => {
                          if (prev.includes(card.id)) {
                            return prev.filter(
                              (id) => id.toString() !== card.id.toString(),
                            );
                          }

                          // MAX source length is 2!
                          if (prev.length >= 2) {
                            return prev;
                          }
                          return [...prev, card.id.toString()];
                        })
                      }
                    />
                    <label htmlFor={`card-${card.id}`} className="flex-1">
                      <CardItem
                        key={card.id}
                        card={`http://d23ybff5p6c2tt.cloudfront.net/${card.id}.png`}
                        name={card.name}
                        type={card.type}
                        address={card.address}
                        rank={card.rank}
                      />
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full gap-2 mt-2">
        <Button
          className="flex justify-center w-full gap-1 px-8 items-top"
          onClick={() => upgrade()}
          price={500}
          disabled={upgradeDisabled}
          style={{ opacity: upgradeDisabled ? 0.5 : 1 }}
        >
          <ChevronsUp size={18} strokeWidth={3} className="mt-0.5 ml-[-4px]" />
          <span>Upgrade</span>
        </Button>
      </div>
    </div>
  );
};

export default CardUpgradePage;
