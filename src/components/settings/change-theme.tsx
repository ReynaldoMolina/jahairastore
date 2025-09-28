'use client';

import { useTheme } from 'next-themes';
import { SettingsSection } from './settings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Sun, Moon, Monitor, ChevronDown, SunMoon } from 'lucide-react';
import { Button } from '../ui/button';

export function ChangeTheme() {
  const { setTheme, theme } = useTheme();

  const label =
    theme === 'system' ? 'Sistema' : theme === 'light' ? 'Claro' : 'Oscuro';

  return (
    <SettingsSection title="Tema">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="justify-start">
            <SunMoon />
            Cambiar tema ({label})
            <ChevronDown className="ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light">
              <Sun />
              Claro
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <Moon />
              Oscuro
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <Monitor />
              Sistema
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SettingsSection>
  );
}
