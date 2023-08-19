import { Home, Plane, WalletCards } from 'lucide-react';
import { useRouter } from 'next/router';

import { cn } from '@/lib/utils';

export const TABS = [
  { name: 'Home', route: '/', icon: <Home size={22} /> },
  { name: 'Travel', route: '/cards/select', icon: <Plane size={22} /> },
  { name: 'Inventory', route: '/inventory', icon: <WalletCards size={22} /> },
];

export const BottomTabBar: React.FC = () => {
  const router = useRouter();

  const currentTab = TABS.find(
    (tab) =>
      tab.route === router.pathname ||
      (tab.route === '/inventory' && router.pathname.startsWith('/inventory')),
  );

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 flex w-full max-w-2xl mx-auto bg-black border-solid border-t border-zinc-800/80 h-[60px]">
        {TABS.map((tab) => (
          <div
            key={tab.route}
            className={cn(
              'flex flex-col items-center justify-center flex-1 cursor-pointer gap-0.5 pt-2',
              currentTab?.route !== tab.route
                ? 'text-slate-400'
                : 'text-[#FF4999]',
            )}
            onClick={() => router.push(tab.route)}
          >
            {tab.icon}
            <span className="mb-auto text-xs font-medium tracking-tighter">
              {tab.name}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full flex h-[68px]" />
    </>
  );
};
