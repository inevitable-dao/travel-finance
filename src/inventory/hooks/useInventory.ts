import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

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

export const useInventory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [hasAuthError, setHasAuthError] = useState<boolean>(false);

  const revalidate = useCallback(async () => {
    setLoading(true);
    setHasAuthError(false);
    try {
      const res = await axios.get<CommonResponse<{ cards: CardItem[] }>>(
        'https://stevejkang.jp.ngrok.io/users/me/cards',
        {
          headers: {
            'X-Inevitable-Auth-Key': localStorage.getItem('access_token'),
          },
        },
      );

      setCards(res.data.result.cards);
    } catch (e: any) {
      console.error(e);
      setHasAuthError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  return {
    loading,
    cards,
    // setCards, // 필요하면 주석해제 ㄱ
    hasAuthError,
    revalidate,
  };
};
