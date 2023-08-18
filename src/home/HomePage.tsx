/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/Button';

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      {/* 카드팩 에셋, 정가, 할인가, 할인률, 구매하기 버튼 */}

      <div className="w-full max-w-[400px] bg-zinc-900 aspect-square relative z-0">
        <img
          alt=""
          src="/assets/glitch.png"
          className="w-[157px] h-[197px] absolute bottom-[-51px] right-[-34px] z-10"
        />

        <div className="w-[64px] h-[100px] absolute bottom-[-24px] right-[-40px] bg-pink-400/20 z-20 backdrop-blur-sm" />
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
            Busan Card Pack #1
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
    </div>
  );
};

export default HomePage;
