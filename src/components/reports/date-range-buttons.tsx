'use client';

import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { SearchParamsProps } from '@/types/types';
import { useSearchUtils } from '@/hooks/use-search-utils';
import {
  lastMonth,
  thisMonth,
  thisWeek,
  thisYear,
  today,
} from '@/lib/get-date';
import { DateSelector } from './date-selector';

export function DateRangeButtons({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { updateParams } = useSearchUtils();

  const startParam = searchParams?.start;
  const endParam = searchParams?.end;

  function applyRange(start: string, end: string) {
    updateParams({
      start,
      end,
    });
  }

  const ranges = {
    today: today(),
    week: thisWeek(),
    month: thisMonth(),
    lastMonth: lastMonth(),
    year: thisYear(),
  };

  function isActive(start?: string, end?: string, a?: string, b?: string) {
    return start === a && end === b;
  }

  return (
    <ButtonGroup className="overflow-auto w-full">
      <Button
        variant="outline"
        className={
          isActive(
            startParam,
            endParam,
            ranges.month.start,
            ranges.month.end
          ) || !startParam
            ? 'bg-muted dark:bg-muted'
            : ''
        }
        onClick={() => applyRange(ranges.month.start, ranges.month.end)}
      >
        Este mes
      </Button>

      <Button
        variant="outline"
        className={
          isActive(startParam, endParam, ranges.week.start, ranges.week.end)
            ? 'bg-muted dark:bg-muted'
            : ''
        }
        onClick={() => applyRange(ranges.week.start, ranges.week.end)}
      >
        Esta semana
      </Button>

      <Button
        variant="outline"
        className={
          isActive(
            startParam,
            endParam,
            ranges.lastMonth.start,
            ranges.lastMonth.end
          )
            ? 'bg-muted dark:bg-muted'
            : ''
        }
        onClick={() => applyRange(ranges.lastMonth.start, ranges.lastMonth.end)}
      >
        Mes pasado
      </Button>

      <Button
        variant="outline"
        className={
          isActive(startParam, endParam, ranges.year.start, ranges.year.end)
            ? 'bg-muted dark:bg-muted'
            : ''
        }
        onClick={() => applyRange(ranges.year.start, ranges.year.end)}
      >
        Este año
      </Button>

      <Button
        variant="outline"
        className={
          isActive(startParam, endParam, ranges.today.start, ranges.today.end)
            ? 'bg-muted dark:bg-muted'
            : ''
        }
        onClick={() => applyRange(ranges.today.start, ranges.today.end)}
      >
        Hoy
      </Button>

      <DateSelector searchParams={searchParams} />
    </ButtonGroup>
  );
}
