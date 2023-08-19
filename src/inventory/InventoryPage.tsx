import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/Button';
import { PageTitle } from '@/components/PageTitle';

const InventoryPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="All cards">Inventory</PageTitle>

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
