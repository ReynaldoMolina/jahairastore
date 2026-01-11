'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Monitor, Moon, Sun } from 'lucide-react';

export function ChangeTheme() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    if (theme === 'light') setTheme('dark');
    if (theme === 'dark') setTheme('light');
    if (theme === 'system') setTheme('light');
  }

  const themeLabel =
    theme === 'system' ? 'sistema' : theme === 'light' ? 'claro' : 'oscuro';

  return (
    <DropdownMenuItem onClick={toggleTheme}>
      {theme === 'system' ? (
        <Monitor />
      ) : theme === 'light' ? (
        <Sun />
      ) : (
        <Moon />
      )}
      Tema ({themeLabel})
    </DropdownMenuItem>
  );
}
