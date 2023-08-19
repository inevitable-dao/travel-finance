import Image from 'next/image';

export type CardItemProps = {
  card: string;
  name: string;
  type: string;
  address: string;
  grade: string;
};

export const CardItem: React.FC<CardItemProps> = ({
  card,
  name,
  type,
  address,
  grade,
}) => {
  return (
    <div className="flex w-full gap-2 p-1 overflow-hidden rounded-md bg-zinc-900">
      <div className="w-[72px] h-[72px] bg-black rounded-sm aspect-square relative z-0">
        <Image src={card} alt="이미지" />
      </div>
      <div className="flex flex-col w-full justify-evenly">
        <span
          className="text-white text-2xl font-bold"
          style={{ fontFamily: 'koverwatch' }}
        >
          {name}
        </span>
        <div className="flex items-baseline">
          <span
            className="w-fit text-l font-bold text-white mr-2"
            style={{ fontFamily: 'koverwatch' }}
          >
            {type}
          </span>
          <span className="w-full text-l font-bold text-gray-300 ">
            {address}
          </span>
        </div>
      </div>
      <div className="w-[72px] h-[72px]">GRADE</div>
    </div>
  );
};
