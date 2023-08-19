import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/router';

import { PageTitle, PageTitleProps } from './PageTitle';

export const PageBack: React.FC<PageTitleProps> = ({ ...props }) => {
  const router = useRouter();

  return (
    <PageTitle {...props}>
      <span
        className="flex items-center gap-2 text-white transition-colors cursor-pointer pointer-events-auto hover:text-slate-400"
        onClick={router.back}
      >
        <Undo2 />
        Back
      </span>
    </PageTitle>
  );
};
