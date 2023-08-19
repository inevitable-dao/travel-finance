export const CardItem: React.FC = () => {
  return (
    <div className="flex w-full gap-2 p-1 overflow-hidden rounded-md bg-zinc-900">
      <div className="w-[72px] h-[72px] bg-black rounded-sm aspect-square relative z-0"></div>
      <div className="flex flex-col">
        <span>Name</span>
      </div>
    </div>
  );
};
