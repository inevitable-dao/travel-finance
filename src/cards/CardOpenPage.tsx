import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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

type CardItem = {
  id: string;
  type: string;
  name: string;
  description: string;
  address: string;
  estimatedHours: number;
  rank: number;
};

enum Stage {
  COVER = 'COVER',
  RESULT = 'RESULT',
}

const CardOpenPage: NextPage = () => {
  const [stage, setStage] = useState<Stage>(Stage.COVER);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoadComplete, setVideoLoadComplete] = useState<boolean>(false);
  const handleVideoLoadingComplete = useCallback(() => {
    setVideoLoadComplete(true);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const [isVideoStarted, setVideoStarted] = useState<boolean>(false);

  const [cards, setCards] = useState<CardItem[]>([]);
  const handleCardPackOpen = useCallback(() => {
    if (!isVideoLoadComplete) {
      return;
    }
    const sendRequest = async () => {
      const res = await axios.post<CommonResponse<{ cards: CardItem[] }>>(
        'https://stevejkang.jp.ngrok.io/card-packages/1',
        undefined,
        {
          headers: {
            'X-Inevitable-Auth-Key': localStorage.getItem('access_token'),
          },
        },
      );

      setCards(res.data.result.cards);
    };

    sendRequest();
    setVideoStarted(true);
    videoRef.current?.play();
  }, [isVideoLoadComplete]);

  const handleVideoEnd = useCallback(() => {
    setStage(Stage.RESULT);
  }, []);

  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle subtitle="Busan Card Pack #1">Open</PageTitle>

      {stage === Stage.COVER && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-full h-full">
          <div
            className={cn(
              'h-[calc(100vh_-_100px)] overflow-hidden flex justify-center items-end',
              isVideoLoadComplete && 'cursor-pointer',
            )}
            onClick={handleCardPackOpen}
          >
            <video
              ref={videoRef}
              src="/assets/pack-open.webm"
              className="w-full max-w-[400px]"
              controls={false}
              muted
              // autoPlay
              playsInline
              onLoadedData={handleVideoLoadingComplete}
              onEnded={handleVideoEnd}
            />
          </div>

          {!isVideoStarted && (
            <Button
              disabled={!isVideoLoadComplete}
              style={{
                opacity: isVideoLoadComplete ? 1 : 0.4,
              }}
              onClick={handleCardPackOpen}
            >
              Touch to Open
            </Button>
          )}
        </div>
      )}

      {stage === Stage.RESULT && (
        <div>
          <h2
            className="text-3xl font-medium text-white"
            style={{ fontFamily: 'koverwatch' }}
          >
            Results
          </h2>
          {cards.map((card) => (
            // eslint-disable-next-line react/jsx-key
            <div className="my-2">
              <CardItem
                card={''}
                name={card.name}
                type={card.type}
                address={card.address}
                rank={card.rank}
              />
            </div>
          ))}
          <div className="flex justify-center w-full gap-2 mt-4">
            <Link href="/inventory">
              <Button>Inventory</Button>
            </Link>

            <Button
              variant="secondary"
              onClick={() => {
                setVideoStarted(false);
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
