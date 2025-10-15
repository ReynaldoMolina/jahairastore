'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function ChangeTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <Select value={theme ?? 'system'} onValueChange={setTheme}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona un tema" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Claro</SelectItem>
        <SelectItem value="dark">Oscuro</SelectItem>
        <SelectItem value="system">Sistema</SelectItem>
      </SelectContent>
    </Select>
  );
}
