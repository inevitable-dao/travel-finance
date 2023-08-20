import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgePercent, Umbrella } from 'lucide-react';

/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import colors from 'tailwindcss/colors';

import { ArticleItem } from '@/components/ArticleItem';
import { BusanBadge } from '@/components/BusanBadge';
import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';
import { PageTitle } from '@/components/PageTitle';
import { cn } from '@/lib/utils';

type CommonResponse<T> = {
  statusCode: number;
  timeStamp: string;
  path: string;
  result: T;
};

type CardPackage = {
  id: number;
  name: string;
  originalPrice: number;
  price: number;
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

type CardPackageType = '1to4' | 'from5';
type CardPackItemProps = {
  type: CardPackageType;
  badge: string;
  active: boolean;
  onClick?: () => void;
};

const CardPackItem: React.FC<CardPackItemProps> = ({
  type,
  active,
  badge,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex w-full relative rounded-lg h-[64px] sm:h-auto sm:aspect-square items-center justify-center p-[1px] overflow-hidden cursor-pointer z-0',
      )}
      onClick={onClick}
    >
      <motion.div
        className="absolute w-[50vw] h-[50vw] sm:p-[1px] sm:w-[256px] sm:h-[256px] sm:top-[-64px] sm:bottom-[-64px] sm:left-[-64px] sm:right-[-64px] -z-10 animate-spin"
        style={{
          animationDuration: '3s',
        }}
        variants={{
          active: {
            background: `linear-gradient(180deg, #70f6ff 0%, #f83e90 100%)`,
          },
          disabled: {
            background: `linear-gradient(
              180deg,
              ${colors.zinc[700]} 0%,
              ${colors.zinc[800]} 100%
            )`,
          },
        }}
        transition={{ ease: 'easeOut', duration: 0.16 }}
        animate={active ? 'active' : 'disabled'}
      />
      <img
        src={
          type === '1to4'
            ? '/assets/card-pack-default.jpg'
            : '/assets/card-pack-extra.jpg'
        }
        className="w-[calc(100%_-_2px)] h-[62px] object-contain bg-black sm:w-full sm:h-full rounded-[7px]"
        alt=""
      />
      <span
        className="absolute flex gap-1 p-1 pb-[3px] pr-1.5 font-bold rounded-sm left-2 bottom-2 text-blue-950 overflow-hidden z-0"
        style={{
          background: `linear-gradient(180deg, #70F6FF 0%, #F83E90 100%)`,
          fontFamily: 'koverwatch',
        }}
      >
        <AnimatePresence>
          {!active && (
            <motion.div
              className="absolute top-0 bottom-0 left-0 right-0"
              style={{
                background: `linear-gradient(180deg, ${colors.zinc[400]} 0%, ${colors.zinc[500]} 100%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
        <span className="z-10">{badge}</span>
      </span>
    </div>
  );
};

const HomePage: NextPage = () => {
  const [cardPackage, setCardPackage] = useState<CardPackage>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get<
          CommonResponse<{ availableCardPackage: CardPackage }>
        >('https://stevejkang.jp.ngrok.io/card-packages');

        console.log(res);

        setCardPackage(res.data.result.availableCardPackage);
      } catch (e) {
        console.error(e);
      }
    };

    fetch();
  }, []);

  const [cards, setCards] = useState<CardItem[]>([]);
  const [hasExpendedCards, setExpendedCards] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      const cards = (await import('@/constants/cards')).CARDS;

      // sort cards by `rank` (high first) -> `type` (TRANSPORTs to the top) -> `name` (english first, numbers last)
      cards.sort((a, b) => {
        if (a.rank !== b.rank) {
          return b.rank - a.rank;
        }

        if (a.type !== b.type) {
          if (a.type === 'TRANSPORT') {
            return -1;
          }

          if (b.type === 'TRANSPORT') {
            return 1;
          }

          return a.type.localeCompare(b.type);
        }

        if (a.name.match(/^\d/)) {
          return 1;
        }

        if (b.name.match(/^\d/)) {
          return -1;
        }

        return a.name.localeCompare(b.name);
      });

      setCards(
        cards.map((v) => ({
          ...v,
          id: v.id.toString(),
          description: v.description || '',
          estimatedHours: v.estimated_hours,
        })),
      );
    };

    fetch();
  }, []);

  const renderedCards = useMemo(() => {
    // if not expended, render only 3 cards
    if (!hasExpendedCards) {
      return cards.slice(0, 3);
    }
    return cards;
  }, [cards, hasExpendedCards]);

  const [cardPackageType, setCardPackageType] =
    useState<CardPackageType>('1to4');

  const price = useMemo(() => {
    if (cardPackageType === '1to4') {
      return cardPackage?.price || 200_000;
    }
    // not implemented
    return 230_000;
  }, [cardPackageType, cardPackage?.price]);

  const originalPrice = useMemo(() => {
    // original price = 120% of the current price
    return price * 1.2;
  }, [price]);

  return (
    <div className="flex flex-col items-center">
      <PageTitle>Home</PageTitle>
      {/* 카드팩 에셋, 정가, 할인가, 할인률, 구매하기 버튼 */}

      <div className="flex flex-col-reverse w-full sm:flex-row">
        <div className="w-full mb-4 sm:mb-0 sm:w-[156px] mt-8 sm:mt-0 justify-center items-center flex flex-row sm:flex-col gap-2">
          <CardPackItem
            type="1to4"
            active={cardPackageType === '1to4'}
            badge="1 to 4"
            onClick={() => setCardPackageType('1to4')}
          />
          <CardPackItem
            type="from5"
            active={cardPackageType === 'from5'}
            badge="From 5"
            onClick={() => setCardPackageType('from5')}
          />
        </div>

        <div className="flex flex-col items-center flex-1">
          <div className="w-full mt-8 max-w-[400px] bg-zinc-900 aspect-square relative z-0 rounded-md overflow-hidden">
            <img
              src={
                cardPackageType === '1to4'
                  ? '/assets/card-pack-default.jpg'
                  : '/assets/card-pack-extra.jpg'
              }
              className="w-full h-full rounded-[5px]"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="relative w-full h-[1px] overflow-hidden border-t rounded-3xl border-slate-6">
        <div
          aria-hidden="true"
          className="left-1/2 top-0 w-[300px] user-select-none center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)`,
          }}
        ></div>
        <div
          aria-hidden="true"
          className="-top-1 left-1/2 h-[200px] w-full max-w-[200px] md:max-w-[400px] user-select-none center pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, #00000000 50%, #000 50%),radial-gradient(rgba(200,200,200,0.1) 0%, transparent 80%)`,
          }}
        ></div>
      </div>

      <div className="flex w-full">
        <div className="flex flex-col items-center flex-1 mt-4">
          <BusanBadge />

          {/* original price */}
          <span className="flex items-center gap-1.5 mt-3">
            <span className="flex items-center gap-0.5 text-sky-500">
              <BadgePercent className="mb-[3px]" size={17} />
              <span
                className="font-bold leading-none"
                style={{ fontFamily: 'koverwatch' }}
              >
                20%
              </span>
            </span>

            <span className="flex items-center">
              <img
                src="/assets/coin.png"
                className="inline-block w-[32px] h-[32px] grayscale-[100%] mb-[4px]"
                alt=""
              />
              <span
                className="text-2xl leading-none line-through text-slate-400"
                style={{ fontFamily: 'koverwatch' }}
              >
                {originalPrice.toLocaleString()}
              </span>
            </span>
          </span>

          {/* current price */}
          <span className="flex items-center">
            <img
              src="/assets/coin.png"
              className="inline-block w-[40px] h-[40px] mb-[5px]"
              alt=""
            />
            <span
              className="text-3xl font-bold leading-none text-white"
              style={{ fontFamily: 'koverwatch' }}
            >
              {price.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      <div className="flex justify-center w-full gap-2 mt-2">
        <Link href="/cards/open">
          <Button>Buy</Button>
        </Link>
      </div>

      <div className="flex flex-col w-full p-2 mt-4 text-sm font-medium border border-solid border-sky-300">
        <span
          className="text-base text-sky-300"
          style={{ fontFamily: 'koverwatch' }}
        >
          Guaranteed
        </span>
        <span className="text-slate-400" style={{ fontFamily: 'koverwatch' }}>
          one transportation with the seaters of your choice, one stay, two
          meals, and two cards for activity/attractions.
        </span>
      </div>

      <h2
        className="w-full mt-12 text-4xl text-white"
        style={{ fontFamily: 'koverwatch' }}
      >
        DROPPED CARDS
      </h2>
      <div className="flex flex-col w-full gap-2 mt-2">
        {renderedCards.map((card, index) => (
          <CardItem
            card={`http://d23ybff5p6c2tt.cloudfront.net/${card.id}.png`}
            key={index}
            name={card.name}
            type={card.type}
            address={card.address}
            rank={card.rank}
          />
        ))}
        <div className="flex justify-center w-full mt-2">
          <button
            className="text-[#FF4999] text-lg text-center"
            style={{ fontFamily: 'koverwatch' }}
            onClick={() => setExpendedCards((v) => !v)}
          >
            {hasExpendedCards ? 'HIDE FULL LIST' : 'SHOW ALL'}
          </button>
        </div>
        {/* {!hasAuthError && (
          <div className="flex justify-center w-full mt-2">
            <button
              className="text-[#FF4999] text-lg text-center"
              style={{ fontFamily: 'koverwatch' }}
            >
              SHOW ALL
            </button>
          </div>
        )} */}
        {/* {hasAuthError && <LoginRequired />} */}
      </div>

      <h2
        className="w-full mt-20 text-4xl text-center text-white"
        style={{ fontFamily: 'koverwatch' }}
      >
        <Umbrella className="inline-block mb-3" size={36} />
        <br />
        Journey through Busan
      </h2>
      <ul className="flex flex-col w-full gap-0.5 mt-6">
        <ArticleItem
          title="부산 남구 여행 | 부산을 구석구석 여행하는 방법! 해파랑길 코스를 따라 오륙도~이기대~용호별빛공원 원데이 코스"
          description="여름 하면 생각나는 도시는 바로 부산이죠?🌊 산과 바다를 함께 느낄 수 있는 부산의 매력적인 여행 코스..."
          date="2023. 7. 7. 18:00"
          image="/assets/blog-1.jpg"
          url="https://blog.naver.com/busanto1115/223149045829"
        />
        <ArticleItem
          title="[내셔널지오그래픽] 2023년 최고의 여행지 문화부분, 부산 선정!"
          description={`세계적인 여행 전문 매거진, '내셔널지오그래픽'!! 내셔널지오그래픽 트래블러 "2023년 최...`}
          date="2022. 11. 29. 18:07"
          image="/assets/blog-2.jpg"
          url="https://blog.naver.com/busanto1115/222941511802"
        />
        <ArticleItem
          title="부산 가볼만한 축제 | 다시 여는 제9회 낙동강 구포나루 축제, 화명생태공원"
          description="*본 콘텐츠는 Go Boogi 크리에이터 추도현님이 취재하신 사진을 바탕으로 작성되었습니다 :) 2019년 이후..."
          date="2022. 10. 26. 17:30"
          image="/assets/blog-3.jpg"
          url="https://blog.naver.com/busanto1115/222911230543"
        />
      </ul>
    </div>
  );
};

export default HomePage;
