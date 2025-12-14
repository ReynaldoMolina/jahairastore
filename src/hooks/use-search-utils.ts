'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function useSearchUtils() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(params: Record<string, string | undefined>) {
    const current = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    router.push(`?${current.toString()}`, { scroll: false });
  }

  return { updateParams };
}
