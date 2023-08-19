import { useCallback } from 'react';

export type PageTitleProps = React.PropsWithChildren & {
  subtitle?: string;
  description?: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  subtitle,
  description,
}) => {
  const moveToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="fixed top-0 flex flex-col w-full mt-4 max-w-2xl px-5 mx-auto pointer-events-none z-[60]">
      <h1
        className="text-3xl font-bold text-white cursor-pointer pointer-events-auto"
        style={{ fontFamily: 'koverwatch' }}
        onClick={moveToTop}
      >
        {children}
      </h1>
      {subtitle && (
        <p
          className="text-sm text-[#FE4999]"
          style={{ fontFamily: 'koverwatch' }}
        >
          {subtitle}
        </p>
      )}
      {description && (
        <p
          className="text-sm text-slate-400"
          style={{ fontFamily: 'koverwatch' }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
