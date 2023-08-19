import axios from 'axios';
import { BadgePercent, Umbrella, User2 } from 'lucide-react';

/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';

import { ArticleItem } from '@/components/ArticleItem';
import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';
import { PageTitle } from '@/components/PageTitle';

type CommonResponese<T> = {
  statusCode: number;
  timeStamp: string;
  path: string;
  result: {
    availableCardPackage: T;
  };
};

type CardPackage = {
  id: number;
  name: string;
  originalPrice: number;
  price: number;
};

const currentPrice = 200_000;
const HomePage: NextPage = () => {
  const [cardPackage, setCardPackage] = useState<CardPackage>();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get<CommonResponese<CardPackage>>(
        'https://stevejkang.jp.ngrok.io/card-packages',
      );

      console.log(res);

      setCardPackage(res.data.result.availableCardPackage);
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get;
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <PageTitle>Home</PageTitle>
      {/* 카드팩 에셋, 정가, 할인가, 할인률, 구매하기 버튼 */}

      <div className="flex flex-col-reverse w-full sm:flex-row">
        <div className="w-full sm:w-[156px] mt-8 sm:mt-0 justify-center items-center flex flex-col gap-2">
          <div className="flex w-full relative rounded-lg h-[64px] sm:h-auto sm:aspect-square bg-black items-center justify-center p-[1px] overflow-hidden border border-solid border-zinc-800">
            <img src="/assets/card-pack.png" className="w-full h-full" alt="" />
            <span className="absolute flex gap-1 p-1 pr-1.5 font-bold rounded-xl shadow-lg left-2 bottom-2 bg-zinc-200/50 backdrop-blur-md text-zinc-900">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-zinc-600">
                <User2 className="" size={12} strokeWidth={3} />
              </span>
              <span>1~4</span>
            </span>
          </div>
          <div className="flex w-full relative rounded-lg h-[64px] sm:h-auto sm:aspect-square bg-black items-center justify-center p-[1px] overflow-hidden border border-solid border-zinc-800">
            <img src="/assets/card-pack.png" className="w-full h-full" alt="" />
            <span className="absolute flex gap-1 p-1 pr-1.5 font-bold rounded-xl shadow-lg left-2 bottom-2 bg-zinc-200/50 backdrop-blur-md text-zinc-900">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-zinc-600">
                <User2 className="" size={12} strokeWidth={3} />
              </span>
              <span>5~</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1">
          <div className="w-full mt-8 max-w-[400px] bg-zinc-900 aspect-square relative z-0 rounded-md overflow-hidden">
            <img
              src="/assets/card-pack.png"
              className="w-full h-full rounded-[5px]"
              alt=""
            />
          </div>

          <div className="flex w-full">
            <div className="flex flex-col items-center flex-1 mt-4">
              <span
                className="flex items-center justify-center h-6 px-3 py-3 text-base font-medium text-center text-pink-300 border-solid border-[1px] border-pink-100/10 rounded-full w-fit bg-slate-100"
                style={{
                  background: `linear-gradient(90deg, rgb(255, 201, 225, 0.1) 0%, rgba(255, 138, 189, 0.3) 47.92%, rgb(255, 200, 224, 0.1) 100%)`,
                }}
              >
                <img
                  src="/assets/busan.png"
                  className="w-[14px] h-[14px] mr-1 inline-block"
                  alt=""
                />

                <span
                  style={{
                    fontFamily: 'koverwatch',
                    lineHeight: 1,
                    marginBottom: -2,
                  }}
                >
                  {cardPackage?.name}
                </span>
              </span>

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
                    {cardPackage?.originalPrice.toLocaleString()}
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
                  200,000
                </span>
              </span>
            </div>
          </div>

          <div className="flex justify-center w-full gap-2 mt-2">
            <Link href="/cards/open">
              <Button>Buy</Button>
            </Link>
          </div>
        </div>
      </div>

      <h2
        className="w-full mt-12 text-4xl text-white"
        style={{ fontFamily: 'koverwatch' }}
      >
        DROPPED CARDS
      </h2>
      <div className="flex flex-col w-full gap-2 mt-2">
        <CardItem />
        <CardItem />
        <CardItem />
        <div className="flex justify-center w-full mt-2">
          <button
            className="text-[#FF4999] text-lg text-center"
            style={{ fontFamily: 'koverwatch' }}
          >
            SHOW ALL
          </button>
        </div>
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
