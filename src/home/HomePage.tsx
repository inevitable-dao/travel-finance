import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      {/* 카드팩 에셋, 정가, 할인가, 할인률, 구매하기 버튼 */}

      <div className="w-full max-w-[400px] bg-zinc-900 aspect-square" />

      <div className="flex">
        <div className="flex flex-col items-end flex-1 mt-2">
          <span className="text-base font-medium text-white">
            Busan Card Pack #1
          </span>

          {/* original price */}
          <span>
            <span className="mr-2 text-white text-bold">20%</span>
            <span className="text-2xl line-through text-slate-400">
              <span>500,000</span>
            </span>
          </span>

          {/* current price */}
          <span className="text-2xl text-white">200,000</span>
        </div>
      </div>

      <div className="flex justify-center w-full gap-2 mt-2">
        <button className="bg-[#F83E90] hover:bg-[#ff3084] px-12 py-4 font-bold transition-all shadow-2xl shadow-pink-600/40 hover:text-zinc-950 hover:shadow-pink-600/65">
          Buy
        </button>
      </div>
    </div>
  );
};

export default HomePage;
