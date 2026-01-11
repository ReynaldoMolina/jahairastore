import { BusinessInfoType } from '@/types/types';

export function Home({ businessInfo }: { businessInfo: BusinessInfoType }) {
  return (
    <span className="text-sm font-extrabold bg-gradient-to-r from-purple-500 to-sky-500 bg-clip-text text-transparent my-2">
      {businessInfo.eslogan}
    </span>
  );
}
