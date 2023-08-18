import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';

enum Stage {
  COVER = 'COVER',
  RESULT = 'RESULT',
}

const CardOpenPage: NextPage = () => {
  const [stage, setStage] = useState<Stage>(Stage.COVER);

  return (
    <div className="flex flex-col items-center">
      {stage === Stage.COVER && (
        <div className="flex justify-center w-full gap-2 mt-2">
          <button
            className="bg-[#F83E90] hover:bg-[#ff3084] px-12 py-4 font-bold transition-all shadow-2xl shadow-pink-600/40 hover:text-zinc-950 hover:shadow-pink-600/65"
            onClick={() => {
              setStage(Stage.RESULT);
            }}
          >
            Touch to Open
          </button>
        </div>
      )}

      {stage === Stage.RESULT && (
        <div>
          <h2 className="text-white">Results</h2>

          <div className="flex justify-center w-full gap-2 mt-2">
            {/* FIXME: Inventory Page */}
            <Link href="/inventory">
              <button className="bg-[#F83E90] hover:bg-[#ff3084] px-12 py-4 font-bold transition-all shadow-2xl shadow-pink-600/40 hover:text-zinc-950 hover:shadow-pink-600/65">
                Inventory
              </button>
            </Link>

            <button
              className="px-12 py-4 font-bold transition-all shadow-2xl bg-slate-100 hover:bg-slate-200 shadow-slate-300/40 hover:text-zinc-950 hover:shadow-slate-300/65"
              onClick={() => {
                setStage(Stage.COVER);
              }}
            >
              Open Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardOpenPage;
