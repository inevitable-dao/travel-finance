export const TABS = [
  { name: 'Home', route: '/' },
  { name: 'Travel', route: '/cards/select' },
  { name: 'Inventory', route: '/inventory' },
];

export const BottomTabBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex w-full max-w-2xl mx-auto bg-black">
      {TABS.map((tab) => (
        <div key={tab.route}>
          <span className="text-white">{tab.name}</span>
        </div>
      ))}
    </div>
  );
};
