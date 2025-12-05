'use client';

import { MenuPosition } from '@/types/types';
import * as React from 'react';

type SettingsContextProps = {
  userSettings: {
    menuPosition: MenuPosition;
  };
};

const SettingsContext = React.createContext<SettingsContextProps | null>(null);

function useSettings() {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider.');
  }

  return context;
}

function SettingsProvider({
  userSettings,
  children,
}: React.ComponentProps<'div'> & {
  userSettings: {
    menuPosition: MenuPosition;
  };
}) {
  const contextValue = React.useMemo<SettingsContextProps>(
    () => ({ userSettings }),
    []
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, useSettings };
