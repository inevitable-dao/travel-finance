import { Umbrella } from 'lucide-react';

/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { ArticleItem } from '@/components/ArticleItem';
import { Button } from '@/components/Button';
import { CardItem } from '@/components/CardItem';

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      {/* 카드팩 에셋, 정가, 할인가, 할인률, 구매하기 버튼 */}

      <div className="w-full max-w-[400px] bg-zinc-900 aspect-square relative z-0 rounded-md overflow-hidden">
        <img src="/assets/card-pack.png" className="w-full h-full" alt="" />
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
              Busan Card Pack #1
            </span>
          </span>

          {/* original price */}
          <span className="flex items-center gap-1.5 mt-3">
            <span className="font-bold text-sky-500">20%</span>

            <span className="flex items-center">
              <img
                src="/assets/coin.png"
                className="inline-block w-[32px] h-[32px] grayscale-[100%]"
                alt=""
              />
              <span className="text-2xl line-through text-slate-400">
                500,000
              </span>
            </span>
          </span>

          {/* current price */}
          <span className="flex items-center">
            <img
              src="/assets/coin.png"
              className="inline-block w-[40px] h-[40px]"
              alt=""
            />
            <span className="text-3xl font-bold text-white">200,000</span>
          </span>
        </div>
      </div>

      <div className="flex justify-center w-full gap-2 mt-2">
        <Link href="/cards/open">
          <Button>Buy</Button>
        </Link>
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
