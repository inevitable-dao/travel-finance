import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const InventoryPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-slate-50">Inventory</h1>

      <Link href="/inventory/1">
        <button className="px-12 py-4 font-bold transition-all shadow-2xl bg-slate-100 hover:bg-slate-200 shadow-slate-300/40 hover:text-zinc-950 hover:shadow-slate-300/65">
          Card 01
        </button>
      </Link>

      <Link href="/">
        <button className="px-12 py-4 font-bold transition-all shadow-2xl bg-slate-100 hover:bg-slate-200 shadow-slate-300/40 hover:text-zinc-950 hover:shadow-slate-300/65">
          Home
        </button>
      </Link>
    </div>
  );
};

export default InventoryPage;
