export const MobileContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <main className="w-full h-full max-w-2xl min-h-screen mx-auto bg-black">
      {children}
    </main>
  );
};
