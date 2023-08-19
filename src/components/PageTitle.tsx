export const PageTitle: React.FC<
  React.PropsWithChildren & {
    subtitle?: string;
    description?: string;
  }
> = ({ children, subtitle, description }) => {
  return (
    <div className="fixed top-0 flex flex-col w-full mt-4 max-w-2xl px-5 mx-auto pointer-events-none z-[60]">
      <h1
        className="text-3xl font-bold text-white"
        style={{ fontFamily: 'koverwatch' }}
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
