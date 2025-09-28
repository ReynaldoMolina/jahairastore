'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import generatePagination from '@/utils/generate-pagination';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

export function PaginationComponent({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages === 0) return;

  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
          {allPages.map((page, index) => {
            return (
              <PaginationItem key={`${page}-${index}`}>
                <PaginationLink
                  href={createPageURL(Number(page))}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* <div className="inline-flex justify-center items-center overflow-scroll min-h-8">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex gap-1">
          {allPages.map((page, index) => {
            let position;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div> */}
    </>
  );
}

function PaginationNumber({ page, href, isActive, position }) {
  const className = clsx(
    'flex size-7 items-center justify-center text-xs dark:hover:bg-neutral-700 hover:bg-sky-200 rounded-md ',
    {
      // 'rounded-l-md': position === 'first' || position === 'single',
      // 'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-sky-200 dark:bg-neutral-700': isActive,
      'text-gray-300': position === 'middle',
    }
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({ href, direction, isDisabled }) {
  const className = clsx('flex size-7 items-center justify-center rounded-md', {
    'pointer-events-none text-neutral-400 dark:text-neutral-700': isDisabled,
    'hover:bg-sky-100 dark:hover:bg-neutral-700': !isDisabled,
    'mr-2 md:mr-4': direction === 'left',
    'ml-2 md:ml-4': direction === 'right',
  });

  const icon =
    direction === 'left' ? (
      <ChevronLeft className="w-4" />
    ) : (
      <ChevronRight className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
