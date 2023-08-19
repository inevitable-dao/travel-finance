export type ArticleItemProps = {
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
};

export const ArticleItem: React.FC<ArticleItemProps> = ({
  title,
  description,
  date,
  image,
  url,
}) => {
  return (
    <li className="w-full">
      <a href={url} target="_blank">
        <div
          className="flex flex-col w-full rounded-md bg-zinc-900 pt-[80px] px-[20px] pb-[20px] relative z-0"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `50.0% center`,
            backgroundSize: 'cover',
          }}
        >
          {/* gradient overlay */}
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black -z-10" />
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
          <p className="mt-1 text-sm text-slate-500">{date}</p>
        </div>
      </a>
    </li>
  );
};
