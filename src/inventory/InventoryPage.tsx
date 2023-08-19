import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { CardItem } from '@/components/CardItem';
import { PageTitle } from '@/components/PageTitle';

const InventoryPage: NextPage = () => {
  const hasItems = true;

  return (
    <div className="flex flex-col items-center mt-[64px]">
      <PageTitle description="All cards">
        {hasItems ? (
          <>
            Inventory <span className="text-[#ff3084]">({6})</span>
          </>
        ) : (
          'Inventory'
        )}
      </PageTitle>

      <div className="flex flex-col w-full">
        <Link href="/inventory/1">
          <CardItem />
        </Link>
      </div>
    </div>
  );
};

export default InventoryPage;
