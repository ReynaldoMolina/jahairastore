import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSearchUtils() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateURL = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { updateURL };
}
