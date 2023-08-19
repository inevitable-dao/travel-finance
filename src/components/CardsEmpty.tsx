import Link from 'next/link';

import { Button } from './Button';

export const CardsEmpty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[200px] gap-2 mt-2 bg-zinc-900">
      <span
        className="text-xl text-center text-white"
        style={{ fontFamily: 'koverwatch' }}
      >
        {`You don't have any cards yet.`}
      </span>
      <Link href="/">
        <Button>{`Let's get started!`}</Button>
      </Link>
    </div>
  );
};
