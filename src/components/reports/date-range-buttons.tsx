import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { SearchParamsProps } from '@/types/types';
import { getCurrentMonth } from '@/lib/get-date';
import { useState } from 'react';
import { useSearchUtils } from '@/hooks/use-search-utils';
import { dateIsoToDate } from '@/lib/formatters';

interface DateRangeButtons {
  searchParams: SearchParamsProps;
}

export function DateRangeButtons({ searchParams }: DateRangeButtons) {
  const { firstDay, lastDay } = getCurrentMonth();

  const startParam: string = searchParams?.start;
  const endParam: string = searchParams?.end;

  const { updateURL } = useSearchUtils();

  function handleChange(startDate: string, endDate: string) {
    updateURL('start', startDate);
    updateURL('end', endDate);
  }

  return (
    <ButtonGroup className="overflow-auto w-full">
      <Button variant="outline" onClick={() => handleChange(firstDay, lastDay)}>
        Este mes
      </Button>
      <Button variant="outline">Esta semana</Button>
      <Button variant="outline">Mes pasado</Button>
      <Button variant="outline">Este año</Button>
      <Button variant="outline">Hoy</Button>
      <Button variant="outline">Rango</Button>
    </ButtonGroup>
  );
}
