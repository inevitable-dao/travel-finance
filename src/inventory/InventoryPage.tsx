import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/Button';

const InventoryPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-slate-50">Inventory</h1>

      <Link href="/inventory/1">
        <Button>Card 01</Button>
      </Link>

      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default InventoryPage;
