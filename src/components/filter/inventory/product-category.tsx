'use client';

import {
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '../../ui/dropdown-menu';
import { useSearchParams } from 'next/navigation';
import { useSearchUtils } from '../header-filter';
import { SelectOptions } from '@/types/types';
import { useState } from 'react';

interface Props {
  categories: SelectOptions[];
}

export function ProductCategoryFilter({ categories }: Props) {
  const { updateFilterList } = useSearchUtils();
  const searchParams = useSearchParams();
  const categoriesParam = searchParams.get('categoria');
  const array = categoriesParam ? categoriesParam.split(',') : [];

  const handleValueChange = (newValue: string) => {
    const valueToUpdate = newValue === '' ? null : newValue;
    updateFilterList('categoria', valueToUpdate);
  };

  return (
    <>
      <DropdownMenuLabel>Categoría</DropdownMenuLabel>
      <DropdownMenuGroup>
        <DropdownMenuCheckboxItem
          checked={array.length === 0}
          onCheckedChange={() => handleValueChange('')}
        >
          Todo
        </DropdownMenuCheckboxItem>
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category.value}
            checked={array.includes(category.value)}
            onCheckedChange={() => handleValueChange(category.value)}
          >
            {category.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuGroup>
    </>
  );
}
