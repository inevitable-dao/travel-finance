import Image from 'next/image';

export type CardItemProps = {
  card: string;
  name: string;
  type: string;
  address: string;
  rank: number;
};

export const CardItem: React.FC<CardItemProps> = ({
  card,
  name,
  type,
  address,
  rank,
}) => {
  return (
    <div className="flex w-full gap-2 p-1 overflow-hidden rounded-md bg-zinc-900">
      <div className="w-[72px] h-[72px] bg-black rounded-sm aspect-square relative z-0">
        <Image src={card} alt="이미지" />
      </div>
      <div className="flex flex-col w-full justify-evenly">
        <span
          className="text-2xl font-bold text-white"
          style={{ fontFamily: 'koverwatch' }}
        >
          {name}
        </span>
        <div className="flex items-baseline">
          <span
            className="mr-2 font-bold text-white w-fit text-l"
            style={{ fontFamily: 'koverwatch' }}
          >
            {type}
          </span>
          <span className="w-full font-bold text-gray-300 text-l ">
            {address}
          </span>
        </div>
      </div>
      <div className="w-[72px] h-[72px] text-slate-100">
        {['B', 'A', 'S'][rank]}
      </div>
    </div>
  );
};
