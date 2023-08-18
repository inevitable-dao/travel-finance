import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/Button';

enum Stage {
  COVER = 'COVER',
  RESULT = 'RESULT',
}

const CardOpenPage: NextPage = () => {
  const [stage, setStage] = useState<Stage>(Stage.COVER);

  return (
    <div className="flex flex-col items-center">
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
          <h2 className="text-white">Results</h2>

          <div className="flex justify-center w-full gap-2 mt-2">
            {/* FIXME: Inventory Page */}
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
