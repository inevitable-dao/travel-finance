export const MobileContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <main className="w-full h-full max-w-2xl min-h-screen px-5 mx-auto bg-black pb-[120px]">
      {children}
    </main>
  );
};
